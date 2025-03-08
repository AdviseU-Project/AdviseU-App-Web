'use client';

import React from 'react';
import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core';
import { Course } from '@/lib/types';
import CourseCard from '@/components/CourseCard';

interface DragOverlayProps {
    activeCourse: Course | null;
}

const DragOverlay: React.FC<DragOverlayProps> = ({ activeCourse }) => {
    return (
        <DndKitDragOverlay
            dropAnimation={{
                duration: 150,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}
        >
            {activeCourse ? (
                <div
                    className="bg-white shadow-lg rounded-lg border-2 border-orange-400 p-1 w-[268px]"
                    style={{
                        cursor: 'grabbing',
                        transform: 'scale(1.05)',
                        opacity: 0.9,
                    }}
                >
                    <CourseCard planId="" course={activeCourse} />
                </div>
            ) : null}
        </DndKitDragOverlay>
    );
};

export default DragOverlay;
