'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Course } from '@/lib/types';
import { useUpdateTerm } from '@/hooks/mutations/terms';

import DragOverlay from './(components)/DragOverlay';
import CourseSearchBar from './(components)/(sections)/CourseSearchBarSection';
import DegreeInfoSection from './(components)/(sections)/DegreeInfoSection';
import { useSession } from 'next-auth/react';
import PlanOverviewSection from './(components)/(sections)/PlanOverviewSection';

interface PlanPageClientProps {
    planId: string;
}

export default function PlanPageClient({ planId }: PlanPageClientProps) {
    const { mutate: updateTerm } = useUpdateTerm();
    const { data } = useSession();
    const plan = data?.user?.extension?.plans.find((plan) => plan._id === planId);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const [activeCourse, setActiveCourse] = useState<Course | null>(null);

    // Event fired when a course is dragged
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        if (!active.data.current) return;

        // Set active course
        setActiveCourse(active.data.current.course as Course);
    };

    // Event fired when a course is dropped
    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;

        if (!over || !active) {
            return;
        }

        if (!active.data.current) return;

        const destinationTermId = over.id as string;
        const { termId: sourceTermId, course: draggedCourse, fromSearch } = active.data.current;

        // Get terms
        const terms = plan?.terms;

        // Find destination term
        const destinationTerm = terms?.find((term) => term._id.toString() === destinationTermId);

        if (!destinationTerm) {
            return;
        }

        // If from search, just add to destination term
        if (fromSearch) {
            updateTerm({
                term: {
                    ...destinationTerm,
                    courses: [...(destinationTerm.courses || []), draggedCourse],
                },
                planId,
            });
        } else {
            // If dropped in the same term, do nothing
            if (sourceTermId === destinationTermId) {
                return;
            }

            const sourceTerm = terms?.find((term) => term._id.toString() === sourceTermId);

            if (!sourceTerm) {
                return;
            }

            // Create a new arrays of courses for both terms
            const newSourceCourses = [...(sourceTerm.courses || [])].filter(
                (course) => course._id.toString() !== draggedCourse._id.toString()
            );
            const newDestinationCourses = [...(destinationTerm.courses || []), draggedCourse];

            // Update source term
            updateTerm({
                term: {
                    ...sourceTerm,
                    courses: newSourceCourses,
                },
                planId,
            });

            // Update destination term
            updateTerm({
                term: {
                    ...destinationTerm,
                    courses: newDestinationCourses,
                },
                planId,
            });
        }
    };

    if (!plan) {
        return null;
    }

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            modifiers={[restrictToWindowEdges]}
        >
            <div className="min-h-screen bg-gray-50">
                {/* Dashboard Content */}
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-3/4 space-y-6">
                            <CourseSearchBar planId={planId} />
                            <PlanOverviewSection plan={plan} planId={planId} />
                        </div>
                        <DegreeInfoSection plan={plan} />
                    </div>
                </div>
            </div>

            {/* Drag Overlay */}
            <DragOverlay activeCourse={activeCourse} />
        </DndContext>
    );
}
