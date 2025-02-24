import { NextResponse } from 'next/server';
import { Course } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

interface UserExtension {
    courses_taken: Course[];
}

interface UserDocument {
    _id: ObjectId;
    extension?: UserExtension;
}

// Update an existing course for a user
const updateUserCourse = async (course: Course, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const result = await users.updateOne(
        { _id: new ObjectId(userId), 'extension.courses_taken.course_number': course.course_number },
        { $set: { 'extension.courses_taken.$': course } }
    );

    return result.modifiedCount === 1;
};

// Delete a course from a user's profile
const deleteUserCourse = async (courseId: string, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const result = await users.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { 'extension.courses_taken': { course_number: courseId } } } // Using course_number to identify the course
    );

    return result.modifiedCount === 1;
};

// PUT request handler - Update a user's course
export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.course) {
            return NextResponse.json({ error: 'Course data is required' }, { status: 400 });
        }

        const status = await updateUserCourse(body.course, session.user.id);

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('PUT Error:', error);
        return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
    }
}

// DELETE request handler - Remove a course from a user
export async function DELETE(request: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const courseId = (await params).courseId;
        console.log(courseId);

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const status = await deleteUserCourse(courseId, session.user.id);

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
    }
}
