import { NextResponse } from 'next/server';
import { NewPlan, Plan, Course, Degree } from '@/lib/types';
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

// Fetch plans for a user
const fetchPlans = async (userId: string): Promise<Plan[]> => {
    const db = (await client.connect()).db('test');
    const collection: Collection<UserDocument> = db.collection('users');

    const user = await collection.findOne({ _id: new ObjectId(userId) });

    return user?.extension?.plans ?? [];
};

// Create a new plan for a user
const createPlan = async (
    plan: NewPlan,
    generatePlan: boolean,
    userId: string,
    coursesTaken: Course[],
    degreesTaking: Degree[]
): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    // Default to provided plan
    let newPlan = { ...plan, _id: new ObjectId() };

    // Optionally generate plan using backend scheduling algorithm
    if (generatePlan) {
        try {
            const backendUrl = process.env.BACKEND_API_URL;
            if (!backendUrl) {
                throw new Error('BACKEND_API_URL is not defined');
            }

            const response = await fetch(`${backendUrl}/api/generatePlan`, {
                method: 'POST',
                body: JSON.stringify({ userId, newPlan, coursesTaken, degreesTaking }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to generate plan from external backend');
            }

            newPlan = await response.json(); // Use the generated plan
        } catch (error) {
            console.error('Error generating plan:', error);
            return false; // Fail gracefully
        }
    }

    const result = await users.updateOne({ _id: new ObjectId(userId) }, { $push: { 'extension.plans': newPlan } });

    return result.modifiedCount === 1;
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

        const status = await createPlan(
            body.plan,
            body.generatePlan,
            session.user.id,
            session.user.extension.courses_taken,
            session.user.extension.degrees
        );
        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}
