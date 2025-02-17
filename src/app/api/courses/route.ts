import { NextResponse } from 'next/server';
import { Course } from '@/lib/types';
import client from '@/lib/mongodb';

const fetchCourses = async (query: string | null): Promise<Course[]> => {
    const db = (await client.connect()).db('adviseu_db');
    const collection = db.collection('courses');

    const filter: any = {};

    if (query) {
        filter.$or = [
            { course_number: { $regex: query, $options: 'i' } },
            { course_name: { $regex: query, $options: 'i' } },
        ];
    }

    const courses = await collection.find(filter).toArray();
    return courses as Course[];
};

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query'); // Get query from the request URL

    try {
        const courses = await fetchCourses(query);
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
    }
}
