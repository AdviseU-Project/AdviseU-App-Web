import { NextResponse, NextRequest } from 'next/server';
import { Course, NewTerm, Plan, Term } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

// Create a new term for a user
const createTerm = async (userId: string, planId: string, newTerm: NewTerm): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    const term = {
        _id: new ObjectId(),
        name: newTerm.name as string,
        courses: (newTerm.courses ?? []) as Course[],
    } as Term;

    const result = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId), 'plans._id': new ObjectId(planId) },
        {
            $push: {
                'plans.$.terms': term,
            } as any,
        }
    );

    return result.modifiedCount === 1;
};

// POST request handler - Create a term
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.term) {
            return NextResponse.json({ error: 'Term data is required' }, { status: 400 });
        }

        const status = await createTerm(session.user.id, body.planId, body.term);
        if (!status) {
            return NextResponse.json({ error: 'Failed to create a term' }, { status: 500 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create term' }, { status: 500 });
    }
}
