import { NextResponse, NextRequest } from 'next/server';
import { NewTerm, Plan, Term } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

interface UserExtension {
    plans: Plan[];
}

interface UserDocument {
    _id: ObjectId;
    extension?: UserExtension;
}

// Create a new term for a user
const createTerm = async (userId: string, planId: string, newTerm: NewTerm): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const term = {
        _id: new ObjectId(),
        name: newTerm.name,
        courses: newTerm.courses,
    } as Term;

    const result = await users.updateOne(
        { _id: new ObjectId(userId), 'extension.plans._id': new ObjectId(planId) },
        {
            $push: {
                'extension.plans.$.terms': term,
            },
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
            return NextResponse.json({ error: 'Plan data is required' }, { status: 400 });
        }

        const status = await createTerm(session.user.id, body.planId, body.term);
        if (!status) {
            return NextResponse.json({ error: 'Failed to createa term' }, { status: 500 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}
