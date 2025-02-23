import { NextResponse } from 'next/server';
import { Degree } from '@/lib/types';
import client from '@/lib/mongodb';

const fetchDegrees = async (query: string | null): Promise<Degree[]> => {
    const db = (await client.connect()).db('adviseu_db');
    const collection = db.collection('degrees');

    const filter: any = {};

    if (query) {
        filter.$or = [{ program_name: { $regex: query, $options: 'i' } }];
    }

    const degrees = await collection.find(filter).toArray();
    return degrees.map((degree) => {
        const { _id, ...rest } = degree; // Omit _id
        return rest as Degree;
    });
};

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query'); // Get query from the request URL

    try {
        const degrees = await fetchDegrees(query);
        return NextResponse.json(degrees);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch degrees' }, { status: 500 });
    }
}
