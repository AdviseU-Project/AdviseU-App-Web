import { NextRequest, NextResponse } from 'next/server';
import { Plan, Term } from '@/lib/types';
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

const updatePlan = async (term: Term, userId: string, planId: string): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    const termId = new ObjectId(term._id);

    const result = await extensionsCollection.updateOne(
        {
            user_id: new ObjectId(userId),
            'plans._id': new ObjectId(planId),
        },
        {
            $set: {
                'plans.$.terms.$[term]': {
                    _id: termId,
                    name: term.name,
                    courses: term.courses,
                },
            } as any,
        },
        {
            arrayFilters: [{ 'term._id': termId }],
        }
    );

    return result.modifiedCount === 1;
};

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.term || !body.planId) {
            return NextResponse.json({ error: 'Term data and planId are required' }, { status: 400 });
        }

        const status = await updatePlan(body.term, session.user.id, body.planId);

        if (!status) {
            return NextResponse.json({ error: 'Failed to update term' }, { status: 500 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('PUT Error:', error);
        return NextResponse.json({ error: 'Failed to update term' }, { status: 500 });
    }
}

// Delete an existing plan for a user
const deletePlan = async (planId: string, userId: string, termId: string): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    const result = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId), 'plans._id': new ObjectId(planId) },
        {
            $pull: {
                'plans.$.terms': {
                    _id: new ObjectId(termId),
                },
            } as any,
        }
    );

    return result.modifiedCount === 1;
};

// DELETE request handler - Delete a term
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ termId: string }> }) {
    try {
        const termId = (await params).termId;
        const planId = request.nextUrl.searchParams.get('planId');

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!planId) {
            return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
        }

        if (!termId) {
            return NextResponse.json({ error: 'Term ID is required' }, { status: 400 });
        }

        const status = await deletePlan(planId, session.user.id, termId);

        if (!status) {
            return NextResponse.json({ error: 'Failed to delete term' }, { status: 500 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}
