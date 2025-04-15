'use client';

import { useDroppable } from '@dnd-kit/core';
import { Term } from '@/lib/types';

// Icons
import { Calendar, BookOpen, GraduationCap } from 'lucide-react';

// Components
import CourseCard from '@/components/CourseCard';
import { Badge } from '@/components/ui/badge';
import DeleteTermDialog from './DeleteTermDialog';

interface TermCardProps {
    term: Term;
    selectedTerm: Term;
    planId: string;
}

const TermCard = ({ term, selectedTerm, planId }: TermCardProps) => {
    const courseCount = term.courses?.length || 0;
    const totalCredits = term.courses?.reduce((sum, course) => sum + (parseInt(course.credits) || 0), 0) || 0;

    // Droppable functionality for terms
    const { setNodeRef, isOver } = useDroppable({
        id: term._id.toString(),
        data: {
            termId: term._id.toString(),
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={`min-w-[320px] min-h-[500px] rounded-lg border bg-white shadow-sm transition-all border-t-4 border-t-orange-400 ${
                isOver ? `scale-[1.01] border border-blue-500 border-t-1 shadow-md` : ''
            }`}
        >
            <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <h3 className="font-medium">{term.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white text-gray-700">
                        {totalCredits} credits
                    </Badge>
                    <DeleteTermDialog planId={planId} term={term} />
                </div>
            </div>

            <div className="flex items-center justify-between border-b px-4 py-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span>
                        {courseCount} {courseCount === 1 ? 'course' : 'courses'}
                    </span>
                </div>
                <span className="text-gray-400">Drop courses here</span>
            </div>

            <div className={`flex flex-col gap-3 p-4 ${isOver ? 'bg-blue-50/30' : ''} transition-colors duration-200`}>
                {courseCount === 0 ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed rounded-lg border-gray-200 bg-gray-50/50 h-full">
                        <GraduationCap className="h-8 w-8 text-gray-300 mb-2" />
                        <p className="text-sm text-gray-600">No courses yet</p>
                        <p className="text-xs text-gray-500 mt-1">Drag courses here from the search results</p>
                    </div>
                ) : (
                    term.courses?.map((course, index) => (
                        <CourseCard
                            key={course._id.toString()}
                            course={course}
                            term={selectedTerm}
                            isDraggable={true}
                            planId={planId}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TermCard;
