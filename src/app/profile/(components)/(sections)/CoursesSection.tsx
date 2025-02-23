'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { X, Trash2 } from 'lucide-react';
import { useAddCourse, useDeleteCourse } from '@/hooks/mutations/userCourses';
import { useFetchCourses } from '@/hooks/queries/useFetchCourses';
import type { Course } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoursesSection() {
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
    const { data: courses, isLoading, isFetching } = useFetchCourses(searchQuery);
    const addCourse = useAddCourse();
    const deleteCourse = useDeleteCourse();
    const { data: session, update: updateSession } = useSession();

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setSearchQuery(search);
        }, 500);

        return () => clearTimeout(timeoutRef.current);
    }, [search]);

    const handleAddCourse = (course: Course) => {
        addCourse.mutate(course);
    };

    const handleDeleteCourse = (course: Course) => {
        deleteCourse.mutate(course, {
            onSuccess: () => {
                updateSession();
            },
        });
    };

    const toggleDescription = (id: string) => {
        setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCancelSearch = () => {
        setSearch('');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Input
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pr-10 border-orange-300 focus:ring-orange-500"
                    />
                    <Button
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={handleCancelSearch}
                    >
                        <X size={16} />
                    </Button>
                </div>
                {search && (
                    <ScrollArea className="h-[500px] rounded-md border p-4">
                        {search !== searchQuery || isLoading || isFetching ? (
                            <>
                                <Skeleton className="h-16 mb-2 rounded-md bg-gray-100" />
                                <Skeleton className="h-16 mb-2 rounded-md bg-gray-100" />
                                <Skeleton className="h-16 mb-2 rounded-md bg-gray-100" />
                            </>
                        ) : (
                            <ul className="space-y-4">
                                {courses?.map((course: Course) => (
                                    <li key={course.course_number} className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{course.course_name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {course.course_number} - {course.credits} credits
                                                </p>
                                                <p className="mt-2 text-sm">
                                                    {expandedDescriptions[course.course_number]
                                                        ? course.description
                                                        : `${course.description.slice(0, 150)}${
                                                              course.description.length > 150 ? '...' : ''
                                                          }`}
                                                    {course.description.length > 150 && (
                                                        <button
                                                            onClick={() => toggleDescription(course.course_number)}
                                                            className="ml-2 text-orange-600 hover:underline"
                                                        >
                                                            {expandedDescriptions[course.course_number]
                                                                ? 'Show less'
                                                                : 'Show more'}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() => handleAddCourse(course)}
                                                className="bg-orange-500 hover:bg-orange-600 text-white text-sm"
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ScrollArea>
                )}
                <div>
                    <h4 className="font-semibold mb-2">Added Courses</h4>
                    <ScrollArea className="h-[400px] rounded-md border p-4">
                        <AnimatePresence>
                            {!session?.user.extension.courses_taken ||
                            session?.user.extension.courses_taken.length === 0 ? (
                                <p>No courses added yet.</p>
                            ) : (
                                session.user.extension.courses_taken.map((course: Course) => (
                                    <motion.div
                                        key={course.course_number}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="mb-4">
                                            <CardContent className="flex justify-between items-center p-4">
                                                <div>
                                                    <h3 className="font-semibold">{course.course_name}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {course.course_number} - {course.credits} credits
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleDeleteCourse(course)}
                                                    className="hover:bg-red-100"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
}
