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
            className={`flex flex-col gap-2 transition-all duration-300 rounded-lg p-2 ${
                isOver
                    ? 'bg-blue-50 border-2 border-dashed border-blue-300'
                    : isActive
                    ? `bg-gray-50 border border-blue-500`
                    : 'border border-transparent'
            }`}
        >
            {children}
        </div>
    );
};

export default DroppableTermContainer;
