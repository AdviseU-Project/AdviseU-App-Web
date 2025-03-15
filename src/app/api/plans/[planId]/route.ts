import { NextResponse } from 'next/server';
import { Plan, Course, Degree } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

// Update an existing plan for a user
const updatePlan = async (plan: Plan, generatePlan: boolean, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    const planId = new ObjectId(plan._id);

    // Update the plan in the database
    const updateResult = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId), 'plans._id': planId },
        {
            $set: {
                'plans.$': {
                    _id: planId,
                    name: plan.name,
                    description: plan.description,
                    terms: plan.terms,
                },
            } as any,
        }
    );

    // Check if update was successful
    if (updateResult.modifiedCount !== 1) {
        return false;
    }

    // If generate plan is true, notify the backend to modify the plan
    if (generatePlan) {
        try {
            const backendUrl = process.env.BACKEND_API_URL;
            if (!backendUrl) {
                throw new Error('BACKEND_API_URL is not defined');
            }

            // Send the userId and planId to the backend
            const response = await fetch(`${backendUrl}/api/generatePlan`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    planId: planId.toString(),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Backend failed to process the plan update');
                return false;
            }

            // Backend will update the plan directly in the database
            // No need to get a response or update the plan again here
        } catch (error) {
            console.error('Error notifying backend to update plan:', error);
            return false; // Fail gracefully
        }
    }

    return true;
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

        const status = await updatePlan(body.plan, body.generatePlan, session.user.id);

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
    const extensionsCollection = db.collection('extensions');

    const result = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId) },
        {
            $pull: {
                plans: {
                    _id: new ObjectId(planId),
                },
            } as any,
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
