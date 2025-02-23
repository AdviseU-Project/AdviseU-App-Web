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

// Update an existing degree for a user
const updateDegree = async (degree: Degree, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const result = await users.updateOne(
        { _id: new ObjectId(userId), 'extension.degrees.program_name': degree.program_name },
        { $set: { 'extension.degrees.$': degree } }
    );

    return result.modifiedCount === 1;
};

// Delete a degree from a user's profile
const deleteDegree = async (degreeId: string, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const result = await users.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { 'extension.degrees': { program_name: degreeId } } } // Using program_name to identify the degree
    );

    return result.modifiedCount === 1;
};

// PUT request handler - Update a degree
export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.degree) {
            return NextResponse.json({ error: 'Degree data is required' }, { status: 400 });
        }

        const status = await updateDegree(body.degree, session.user.id);

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('PUT Error:', error);
        return NextResponse.json({ error: 'Failed to update degree' }, { status: 500 });
    }
}

// DELETE request handler - Remove a degree
export async function DELETE(request: Request, { params }: { params: Promise<{ degreeId: string }> }) {
    try {
        const degreeId = (await params).degreeId;
        console.log(degreeId);

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const status = await deleteDegree(degreeId, session.user.id);

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json({ error: 'Failed to delete degree' }, { status: 500 });
    }
}
