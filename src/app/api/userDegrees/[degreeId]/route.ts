import { NextResponse } from 'next/server';
import { Degree } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

// Update an existing degree for a user
const updateUserDegree = async (degree: Degree, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    const result = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId), 'degrees.program_name': degree.program_name },
        { $set: { 'degrees.$': degree } as any }
    );

    return result.modifiedCount === 1;
};

// Delete a degree from a user's profile
const deleteUserDegree = async (degreeId: string, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    const result = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId) },
        { $pull: { degrees: { program_name: degreeId } } as any } // Using program_name to identify the degree
    );

    return result.modifiedCount === 1;
};

// PUT request handler - Update a user's degree
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

        const status = await updateUserDegree(body.degree, session.user.id);

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('PUT Error:', error);
        return NextResponse.json({ error: 'Failed to update degree' }, { status: 500 });
    }
}

// DELETE request handler - Remove a degree from a user
export async function DELETE(request: Request, { params }: { params: Promise<{ degreeId: string }> }) {
    try {
        const degreeId = (await params).degreeId;

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const status = await deleteUserDegree(degreeId, session.user.id);

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json({ error: 'Failed to delete degree' }, { status: 500 });
    }
}
