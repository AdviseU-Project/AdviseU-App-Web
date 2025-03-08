'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Term } from '@/lib/types';
import { useTermsStore } from '@/app/store';

interface DroppableTermContainerProps {
    term: Term;
    children: React.ReactNode;
}

const DroppableTermContainer: React.FC<DroppableTermContainerProps> = ({ term, children }) => {
    const termId = term._id.toString();
    const { selectedTerm } = useTermsStore();

    const { setNodeRef, isOver } = useDroppable({
        id: termId,
    });

    const isActive = selectedTerm === term;

    return (
        <div
            ref={setNodeRef}
            className={`flex flex-col gap-2 transition-all duration-300 rounded-lg ${
                isOver ? 'bg-blue-50 scale-[1.02] shadow-inner' : isActive ? 'bg-orange-50/50' : ''
            }`}
            style={{
                // Adding a subtle border only when dragging over
                border: isOver ? '2px dashed rgba(59, 130, 246, 0.5)' : '2px solid transparent',
            }}
        >
            {children}
        </div>
    );
};

export default DroppableTermContainer;
