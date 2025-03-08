'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useFetchCourses } from '@/hooks/queries/useFetchCourses';
import { useDebounce } from '@/hooks/use-debounce'; // Import from the separate hook file
import AddTermDialog from '../AddTermDialog';
import CourseCard from '@/components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseSearchBarSectionProps {
    planId: string;
}

const CourseSearchBarSection: React.FC<CourseSearchBarSectionProps> = ({ planId }) => {
    const [search, setSearch] = useState('');
    const delayedSearch = useDebounce(search, 500); // Use the custom debounce hook with 500ms delay
    const { data, isFetching, isPending } = useFetchCourses(delayedSearch);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        department: [] as string[],
        credits: [] as string[],
        difficulty: [] as string[],
    });

    return (
        <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-9"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        onClick={() => setSearch('')}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                    <AddTermDialog planId={planId} variant="default" />
                </div>
            </div>

            {/* TODO: Filters Section */}

            {/* Search Results */}
            {search && (
                <div className="mt-4 pt-4 border-t max-h-96">
                    <h3 className="text-sm font-medium mb-3 mx-1 flex justify-between">
                        <span>Search Results</span>
                        <span className="text-gray-500">{data?.length} courses found</span>
                    </h3>

                    {search !== delayedSearch || isFetching || isPending ? (
                        <div className="flex gap-2 items-center">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-20 w-64 bg-gray-100 animate-pulse rounded-lg"></Skeleton>
                            ))}
                        </div>
                    ) : (
                        <div className="flex gap-3 overflow-x-auto">
                            {data!.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 mx-auto">
                                    <Search className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                                    <p>No courses found matching "{delayedSearch}"</p>
                                </div>
                            ) : (
                                data!.map((course, index) => (
                                    <CourseCard
                                        key={index}
                                        course={course}
                                        isDraggable={true}
                                        fromSearch={true}
                                        planId={planId}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseSearchBarSection;
