'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import { useTermsStore } from '@/app/store';
import { Course } from '@/lib/types';
import { X } from 'lucide-react';
import { useFetchCourses } from '@/hooks/queries/useFetchCourses';
import { Skeleton } from '@/components/ui/skeleton';
import { useUpdateTerm } from '@/hooks/mutations/terms';

interface CourseSearchSectionProps {
    planId: string;
}

const CourseSearchSection: React.FC<CourseSearchSectionProps> = ({ planId }) => {
    const { selectedTerm, selectTerm } = useTermsStore();
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, isFetching } = useFetchCourses(searchQuery);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const { mutate } = useUpdateTerm();

    const handleCancelSearch = () => {
        setSearch('');
        setSelectedCourse(null);
    };

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setSearchQuery(search);
        }, 500);

        return () => clearTimeout(timeoutRef.current);
    }, [search]);

    const handleAddCourse = () => {
        if (selectedCourse && selectedTerm) {
            mutate({
                term: {
                    ...selectedTerm,
                    courses: [...selectedTerm.courses, selectedCourse],
                },
                planId: planId,
            });

            // Reset search form fields
            setSelectedCourse(null);
            selectTerm(null);
        }
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setSelectedCourse(null);
    };
    return (
        <motion.div
            className="w-full max-w-sm p-8 gap-2 bg-white/80 backdrop-blur-sm shadow-xl rounded-xl"
            initial={{ y: 20, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.25 }}
        >
            <div className="flex flex-col gap-2 mb-6 h-full">
                <h1 className="text-xl text-center font-bold">Search for courses</h1>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search for courses..."
                        value={search}
                        onChange={handleChangeSearch}
                        className="pr-10 bg-white/90"
                    />
                    <Button
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={handleCancelSearch}
                    >
                        <X size={16} />
                    </Button>
                </div>

                <div className="flex flex-col justify-between h-[100%] gap-2">
                    {search && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col bg-white p-4 gap-3 rounded-md shadow-md max-h-60 overflow-y-auto outline outline-gray-200"
                        >
                            {search != searchQuery || isLoading ? (
                                <>
                                    <Skeleton className="h-16 p-1 rounded-md bg-gray-100" />
                                    <Skeleton className="h-16 p-1 rounded-md bg-gray-100" />
                                    <Skeleton className="h-16 p-1 rounded-md bg-gray-100" />
                                    <Skeleton className="h-16 p-1 rounded-md bg-gray-100" />
                                </>
                            ) : (
                                data?.map((course: Course, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        className={`p-[2px] cursor-pointer rounded-md ${
                                            selectedCourse === course ? 'bg-orange-700' : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => setSelectedCourse(course)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <CourseCard course={course} planId={planId} />
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}

                    {search && selectedCourse && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                            <Button onClick={handleAddCourse} disabled={!selectedTerm || !selectedCourse}>
                                Add {selectedCourse.course_number} to{' '}
                                {selectedTerm ? selectedTerm.name : '<No Term Selected>'}
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CourseSearchSection;
