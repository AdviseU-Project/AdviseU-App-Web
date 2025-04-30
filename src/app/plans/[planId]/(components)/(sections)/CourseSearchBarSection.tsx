'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X, BookOpen, Lightbulb } from 'lucide-react';
import { useFetchCourses } from '@/hooks/queries/useFetchCourses';
import { useDebounce } from '@/hooks/use-debounce';
import CourseCard from '@/components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface CourseSearchBarSectionProps {
    planId: string;
}

const CourseSearchBarSection: React.FC<CourseSearchBarSectionProps> = ({ planId }) => {
    const [search, setSearch] = useState('');
    const delayedSearch = useDebounce(search, 500);
    const { data, isFetching, isPending } = useFetchCourses(delayedSearch);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        department: [] as string[],
        credits: [] as string[],
        difficulty: [] as string[],
    });

    // TODO: Replace with actual recommendations
    const quickSuggestions = ['CS 162', 'CS 325', 'CS 261', 'CS 493', 'CS 494', 'CS 381'];

    return (
        <div className="bg-white rounded-lg border shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-grow max-w-md relative">
                    <div className="relative rounded-md overflow-hidden">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Input
                            type="text"
                            placeholder="Search for courses..."
                            value={search}
                            className="w-full pl-10 pr-10 border-gray-200 focus-visible:ring-orange-500 h-10"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-700"
                                onClick={() => setSearch('')}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Quick Suggestions (shown when search is empty) */}
            {!search && (
                <div className="mt-5">
                    <div className="flex items-center mb-3">
                        <Lightbulb className="h-4 w-4 text-gray-500 mr-2" />
                        <h3 className="text-sm font-medium text-gray-700">Quick Suggestions</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {quickSuggestions.map((suggestion, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="bg-gray-50 border-gray-200 hover:bg-gray-100"
                                onClick={() => setSearch(suggestion)}
                            >
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Search Results */}
            {search && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                            <h3 className="text-sm font-medium text-gray-700">Search Results</h3>
                        </div>
                        <Badge variant="outline" className="bg-gray-50 text-gray-600">
                            {isPending ? '...' : data?.length || 0} courses
                        </Badge>
                    </div>

                    {search !== delayedSearch || isFetching || isPending ? (
                        <div className="flex gap-3 overflow-x-auto pb-1 pt-1">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-24 w-64 bg-gray-100 animate-pulse rounded-lg"></Skeleton>
                            ))}
                        </div>
                    ) : (
                        <div className="flex gap-3 overflow-x-auto py-1 pb-2">
                            {data!.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 mx-auto w-full bg-gray-50 rounded-lg">
                                    <Search className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                                    <p className="font-medium text-gray-500">
                                        No courses found matching "{delayedSearch}"
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Try a different search term or browse courses by category
                                    </p>
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
