import { NextResponse } from 'next/server';
import { Plan, Course, Degree } from '@/lib/types';
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

// Update an existing plan for a user
const updatePlan = async (
    plan: Plan,
    generatePlan: boolean,
    userId: string,
    coursesTaken: Course[],
    degreesTaking: Degree[]
): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    // Optionally generate plan using backend scheduling algorithm
    if (generatePlan) {
        try {
            const backendUrl = process.env.BACKEND_API_URL;
            if (!backendUrl) {
                throw new Error('BACKEND_API_URL is not defined');
            }

            const response = await fetch(`${backendUrl}/api/generatePlan`, {
                method: 'POST',
                body: JSON.stringify({ userId, plan, coursesTaken, degreesTaking }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to generate plan from external backend');
            }

            plan = await response.json(); // Use the generated plan
        } catch (error) {
            console.error('Error generating plan:', error);
            return false; // Fail gracefully
        }
    }

    const planId = new ObjectId(plan._id);

    const result = await users.updateOne(
        { _id: new ObjectId(userId), 'extension.plans._id': planId },
        {
            $set: {
                'extension.plans.$': {
                    _id: planId,
                    name: plan.name,
                    description: plan.description,
                    terms: plan.terms,
                },
            },
        }
    );

    return result.modifiedCount === 1;
};

// PUT request handler - Update a plan
export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.plan) {
            return NextResponse.json({ error: 'Plan data is required' }, { status: 400 });
        }

        const status = await updatePlan(
            body.plan,
            body.generatePlan,
            session.user.id,
            session.user.extension.courses_taken,
            session.user.extension.degrees
        );

        if (!status) {
            throw new Error('Failed to update plan');
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}

// Delete an existing plan for a user
const deletePlan = async (planId: string, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const result = await users.updateOne(
        { _id: new ObjectId(userId) },
        {
            $pull: {
                'extension.plans': {
                    _id: new ObjectId(planId),
                },
            },
        }
    );

    return result.modifiedCount === 1;
};

// DELETE request handler - Delete a plan
export async function DELETE(request: Request, { params }: { params: Promise<{ planId: string }> }) {
    try {
        const planId = (await params).planId;

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const status = await deletePlan(planId, session.user.id);

        if (!status) {
            return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
    }
}
