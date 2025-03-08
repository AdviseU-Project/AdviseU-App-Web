'use client';

import { useDroppable } from '@dnd-kit/core';
import { Term } from '@/lib/types';

// Icons
import { Calendar, BookOpen, X } from 'lucide-react';

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
            className={`min-w-[320px] min-h-[500px] rounded-xl border bg-white shadow-sm transition-all ${
                isOver ? 'bg-blue-50 ring-2 ring-blue-300' : ''
            }`}
        >
            <div className="flex items-center justify-between px-5 py-4 border-b">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <h3 className="font-medium">{term.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <DeleteTermDialog planId={planId} term={term} />
                </div>
            </div>
            <div className={`flex flex-col gap-3 p-4 ${isOver ? 'bg-blue-50/50' : ''}`}>
                {courseCount === 0 ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed rounded-lg border-gray-200 bg-gray-50">
                        <BookOpen className="h-8 w-8 text-orange-500 mb-2" />
                        <p className="text-sm text-gray-600">No courses added to this term</p>
                        <p className="text-xs text-gray-500 mt-1">Drag courses here or use the search bar</p>
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
