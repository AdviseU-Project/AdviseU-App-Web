import { NextResponse } from 'next/server';
import { NewPlan, Plan, Course, Degree } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

// Fetch plans for a user
const fetchPlans = async (userId: string): Promise<Plan[]> => {
    const db = (await client.connect()).db('test');
    const extensionsCollection = db.collection('extensions');

    const extension = await extensionsCollection.findOne({ user_id: new ObjectId(userId) });

    return extension?.plans ?? [];
};

// Create a new plan for a user
const createPlan = async (plan: NewPlan, generatePlan: boolean, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    // Create the new plan with a generated ObjectId
    const newPlanId = new ObjectId();
    const newPlan = { ...plan, _id: newPlanId };

    // First, save the plan to the database
    const saveResult = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId) },
        { $push: { plans: newPlan } as any }
    );

    // Check if save was successful
    if (saveResult.modifiedCount !== 1) {
        return false;
    }

    // Optionally generate plan using backend scheduling algorithm
    if (generatePlan) {
        try {
            const backendUrl = process.env.BACKEND_API_URL;
            if (!backendUrl) {
                throw new Error('BACKEND_API_URL is not defined');
            }

            // Send the userId and planId to the backend
            const response = await fetch(`${backendUrl}/api/generatePlan`, {
                method: 'POST',
                body: JSON.stringify({ userId: userId, planId: newPlanId.toString() }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.log('Backend failed to process the plan with status:', response.status);
                throw new Error('Backend returned an error response');
            }

            // Backend will update the plan directly in the database
            // No need to get a response or update the plan again here
        } catch (error) {
            console.error('Error in backend plan generation process:', error);

            // Delete the plan whether it was a fetch failure or a bad response
            try {
                const removeResult = await extensionsCollection.updateOne(
                    { user_id: new ObjectId(userId) },
                    {
                        $pull: {
                            plans: {
                                _id: newPlanId,
                            },
                        } as any,
                    }
                );

                if (removeResult.modifiedCount !== 1) {
                    console.error('Failed to remove the plan after backend processing failure');
                } else {
                    console.log('Successfully removed plan after backend failure');
                }
            } catch (removeError) {
                console.error('Error removing plan after backend failure:', removeError);
            }

            return false; // Fail gracefully
        }
    }

    return true;
};

// GET request handler - Fetch plans
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const plans = await fetchPlans(session.user.id);
        return NextResponse.json(plans);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
    }
}

// POST request handler - Create a plan
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.plan) {
            return NextResponse.json({ error: 'Plan data is required' }, { status: 400 });
        }

        const status = await createPlan(body.plan, body.generatePlan, session.user.id);

        if (!status) {
            throw new Error('Failed to create plan');
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}
