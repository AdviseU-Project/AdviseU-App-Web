import { NextResponse } from 'next/server';
import { Degree } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

// Fetch degrees for a user
const fetchUserDegrees = async (userId: string): Promise<Degree[]> => {
    const db = (await client.connect()).db('test');
    const extensionsCollection = db.collection('extensions');

    const extension = await extensionsCollection.findOne({ user_id: new ObjectId(userId) });
    return extension?.degrees ?? [];
};

// Add a degree for a user, preventing duplicates
const addUserDegree = async (degree: Degree, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    const extension = await extensionsCollection.findOne({ user_id: new ObjectId(userId) });

    if (extension?.degrees?.some((d: Degree) => d.program_name === degree.program_name)) {
        return false; // Degree already exists, prevent duplicate insertion
    }

    const result = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId) },
        { $push: { degrees: degree } as any }
    );

    return result.modifiedCount === 1;
};

// GET request handler - Fetch user degrees
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const degrees = await fetchUserDegrees(session.user.id);
        return NextResponse.json(degrees);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch user degrees' }, { status: 500 });
    }
}

// POST request handler - Add a degree to a user
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

        const status = await addUserDegree(body.degree, session.user.id);
        if (!status) {
            return NextResponse.json({ error: 'Degree already added' }, { status: 409 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to add degree' }, { status: 500 });
    }
}
