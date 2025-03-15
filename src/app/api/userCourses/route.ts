import { NextResponse } from 'next/server';
import { Course } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

// Fetch courses a user has taken
const fetchUserCourses = async (userId: string): Promise<Course[]> => {
    const db = (await client.connect()).db('test');
    const extensionsCollection = db.collection('extensions');

    const extension = await extensionsCollection.findOne({ user_id: new ObjectId(userId) });
    return extension?.courses_taken ?? [];
};

// Add a course for a user, preventing duplicates
const addUserCourse = async (course: Course, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const extensionsCollection = db.collection('extensions');

    const extension = await extensionsCollection.findOne({ user_id: new ObjectId(userId) });

    if (extension?.courses_taken?.some((c: Course) => c.course_number === course.course_number)) {
        return false; // Course already taken, prevent duplicate insertion
    }

    const result = await extensionsCollection.updateOne(
        { user_id: new ObjectId(userId) },
        { $push: { courses_taken: course } as any }
    );

    return result.modifiedCount === 1;
};

// GET request handler - Fetch courses a user has taken
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const courses = await fetchUserCourses(session.user.id);
        return NextResponse.json(courses);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch courses a user has taken' }, { status: 500 });
    }
}

// POST request handler - Add a course to a user
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.course) {
            return NextResponse.json({ error: 'Course data is required' }, { status: 400 });
        }

        const status = await addUserCourse(body.course, session.user.id);
        if (!status) {
            return NextResponse.json({ error: 'Course already added' }, { status: 409 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to add course' }, { status: 500 });
    }
}
