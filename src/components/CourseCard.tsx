import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Course, Term } from '@/lib/types';
import { EllipsisVertical } from 'lucide-react';
import { usePropStore, useTermsStore } from '@/app/store';
import { useUpdateTerm } from '@/hooks/mutations/terms';

interface CourseCardProps {
    term?: Term;
    course: Course;
    courseIndex?: number;
    selected?: boolean;
    selectable?: boolean;
    onClick?: () => void;
    displayOptions?: boolean;
    planId: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
    term,
    course,
    courseIndex,
    selected,
    selectable,
    onClick,
    displayOptions,
    planId
}) => {
    if (!onClick) {
        onClick = () => {};
    }

    const { mutate } = useUpdateTerm();

    const handleRemoveCourse = (course: Course, term?: Term) => {
        if (!term || !course) return;

        mutate({
            term: {
                ...term,
                courses: term.courses.filter((c) => c.course_number !== course.course_number),
            },
            planId: planId,
        });
    };

    const cardVariants = [
        'flex items-center justify-between rounded-lg border p-2 shadow-sm bg-white sm:p-3',
        selected ? 'border-zinc-400 scale-105 bg-zinc-50' : '',
        selectable ? 'cursor-pointer hover:scale-105 hover:border-zinc-400' : '',
    ];

    return (
        <div key={courseIndex} className={`${cardVariants.join(' ')}`} onClick={onClick}>
            {/* Course Info */}
            <div>
                <div className="text-sm font-medium sm:text-md">{course.course_number}</div>
                <div className="text-xs text-muted-foreground line-clamp-1 sm:text-sm">{course.course_name}</div>
            </div>

            {/* Options */}
            <div className={displayOptions ? '' : 'hidden'}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRemoveCourse(course, term)}>
                            Remove course
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default CourseCard;
