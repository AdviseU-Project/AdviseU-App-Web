import React from 'react';
import { Course, Term } from '@/lib/types';
import { useDraggable } from '@dnd-kit/core';
import { Badge } from '@/components/ui/badge';
import CourseDetailsDialog from '@/app/plans/[planId]/(components)/CourseDetailsDialog';
import DeleteCourseDialog from '@/app/plans/[planId]/(components)/DeleteCourseDialog';

interface CourseCardProps {
    course: Course;
    term?: Term;
    isDraggable?: boolean;
    fromSearch?: boolean;
    planId: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, term, isDraggable = true, fromSearch = false, planId }) => {
    // Set up draggable properties
    const id = fromSearch
        ? `search-${course._id.toString()}`
        : term
        ? `term-${term._id.toString()}-course-${course._id.toString()}`
        : `course-${course._id.toString()}`;
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        data: {
            course,
            termId: term?._id.toString(),
            fromSearch,
        },
        disabled: !isDraggable,
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`min-w-64 max-h-24 max-w-80 p-3 mt-0 rounded-lg border bg-white hover:bg-gray-50 transition-all touch-none`}
            id={course._id.toString()}
        >
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{course.course_number}</span>
                    <Badge variant="outline" className="bg-blue-50 text-xs">
                        {course.credits} cr
                    </Badge>
                </div>
                <div className="flex items-center">
                    <CourseDetailsDialog course={course} />

                    {/* Trash Course */}
                    {term && <DeleteCourseDialog course={course} term={term} planId={planId} />}
                </div>
            </div>
            <div className="text-sm line-clamp-2 mt-1 text-gray-700">{course.course_name}</div>
        </div>
    );
};

export default CourseCard;
