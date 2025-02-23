import { NextResponse } from 'next/server';
import { Degree } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

interface UserExtension {
    degrees: Degree[];
}

interface UserDocument {
    _id: ObjectId;
    extension?: UserExtension;
}

// Fetch degrees for a user
const fetchDegrees = async (userId: string): Promise<Degree[]> => {
    const db = (await client.connect()).db('test');
    const collection: Collection<UserDocument> = db.collection('users');

    const user = await collection.findOne({ _id: new ObjectId(userId) });

    return user?.extension?.degrees ?? [];
};

// Add a degree for a user, preventing duplicates
const addDegree = async (degree: Degree, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (user?.extension?.degrees?.some((d) => d.program_name === degree.program_name)) {
        return false; // Degree already exists, prevent duplicate insertion
    }

    const result = await users.updateOne({ _id: new ObjectId(userId) }, { $push: { 'extension.degrees': degree } });

    return result.modifiedCount === 1;
};

// GET request handler - Fetch degrees
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const degrees = await fetchDegrees(session.user.id);
        return NextResponse.json(degrees);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch degrees' }, { status: 500 });
    }
}

// POST request handler - Add a degree
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.degree) {
            return NextResponse.json({ error: 'Degree data is required' }, { status: 400 });
        }

        const status = await addDegree(body.degree, session.user.id);
        if (!status) {
            return NextResponse.json({ error: 'Degree already added' }, { status: 409 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to add degree' }, { status: 500 });
    }
}
