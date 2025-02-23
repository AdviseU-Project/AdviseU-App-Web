import { Course } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../use-toast';
import { getSession } from 'next-auth/react';

export const useAddCourse = () => {
    return useMutation({
        mutationKey: ['courses_taken'],
        mutationFn: (course: Course) => addCourse(course),
        onSuccess: (_, course) => {
            toast({
                title: `Course Added: ${course.course_number}`,
                description: 'Your course has been added successfully.',
            });

            getSession(); // Refresh session
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
};

const addCourse = async (course: Course) => {
    const response = await fetch(`/api/userCourses`, {
        method: 'POST',
        body: JSON.stringify({ course }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const useUpdateCourse = () => {
    return useMutation({
        mutationKey: ['courses_taken'],
        mutationFn: (course: Course) => updateCourse(course),
        onSuccess: (_, course) => {
            toast({
                title: `Course Updated: ${course?.course_number}`,
                description: 'Your course has been updated successfully.',
            });

            getSession();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
};

const updateCourse = async (course: Course | null) => {
    if (!course) return;

    const response = await fetch(`/api/userCourses/${course.course_number}`, {
        method: 'PUT',
        body: JSON.stringify({ course }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const useDeleteCourse = () => {
    return useMutation({
        mutationKey: ['courses'],
        mutationFn: (course: Course) => deleteCourse(course),
        onSuccess: () => {
            toast({
                title: 'Course Deleted',
                description: 'Your course has been deleted successfully.',
            });

            getSession();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
};

const deleteCourse = async (course: Course | null) => {
    if (!course?.course_number) throw new Error('Invalid course data');

    const response = await fetch(`/api/userCourses/${course.course_number}`, { method: 'DELETE' });
    const data = await response.json();
    return data;
};
