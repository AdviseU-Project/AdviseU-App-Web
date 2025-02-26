'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';
import { usePlansStore } from '@/app/store';
import { Plan } from '@/lib/types';
import { useDeletePlan } from '@/hooks/mutations/plans';
import { useSession } from 'next-auth/react';
import { Sortable, Plugins } from '@shopify/draggable';

const ListPlansSection: React.FC = () => {
    const { setEditingPlan } = usePlansStore();
    const { data } = useSession();
    const { mutate } = useDeletePlan();
    const containerRef = useRef<HTMLDivElement>(null);
    const sortableRef = useRef<Sortable | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Initialize the Sortable instance
    useEffect(() => {
        if (!containerRef.current || !data?.user.extension.plans?.length) return;

        // Clean up previous instance if it exists
        if (sortableRef.current) {
            sortableRef.current.destroy();
        }

        // Create a new Sortable instance with SwapAnimation plugin
        sortableRef.current = new Sortable(containerRef.current, {
            draggable: '.draggable-plan-item',
            plugins: [Plugins.SwapAnimation],
            swapAnimation: {
                duration: 300,
                easingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                horizontal: true,
            },
            delay: 100,
            // Use the full class names object structure required by TypeScript
            classes: {
                'body:dragging': 'draggable-body-dragging',
                'container:dragging': 'plans-container-dragging',
                'source:dragging': 'plan-is-dragging',
                'source:placed': 'plan-is-placed',
                'container:placed': 'plans-container-placed',
                'draggable:over': 'plan-drag-over',
                'container:over': 'plans-container-over',
                'source:original': 'plan-original',
                mirror: 'plan-mirror',
            },
        });

        // Set up event listeners
        sortableRef.current.on('drag:start', (event) => {
            // Prevent drag if clicking on buttons or links
            const target = event.originalEvent.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.tagName === 'A' ||
                target.closest('a')
            ) {
                event.cancel();
                return;
            }

            // Position the mirror element exactly where the original element is
            // This prevents the "jump" to the top-left
            const originalRect = event.source.getBoundingClientRect();
            const mirrorElement = event.mirror;

            if (mirrorElement) {
                mirrorElement.style.width = `${originalRect.width}px`;
                mirrorElement.style.height = `${originalRect.height}px`;
                mirrorElement.style.transform = 'none';

                // Customize mirror appearance
                mirrorElement.classList.add('perfect-mirror');

                // Hide the original element completely rather than just reducing opacity
                event.source.classList.add('hidden-while-dragging');
            }

            setIsDragging(true);
            document.body.classList.add('is-dragging-plan');
        });

        sortableRef.current.on('drag:move', (event) => {
            // Make mirror move with the cursor with slight adjustment for natural feel
            const mouseX = event.sensorEvent.clientX;
            const mouseY = event.sensorEvent.clientY;

            // Optional: Add slight offset for better visibility of cursor
            const offsetX = 0;
            const offsetY = 0;

            if (event.mirror) {
                const width = parseFloat(event.mirror.style.width);
                const height = parseFloat(event.mirror.style.height);

                // Center the mirror around the cursor
                event.mirror.style.left = `${mouseX - width / 2 + offsetX}px`;
                event.mirror.style.top = `${mouseY - height / 2 + offsetY}px`;
            }
        });

        sortableRef.current.on('drag:stop', () => {
            setIsDragging(false);
            document.body.classList.remove('is-dragging-plan');

            // Small delay to allow animations to complete
            setTimeout(() => {
                const hiddenElements = document.querySelectorAll('.hidden-while-dragging');
                hiddenElements.forEach((el) => el.classList.remove('hidden-while-dragging'));
            }, 50);
        });

        sortableRef.current.on('sortable:sorted', (event) => {
            // Get the new order of plans
            const newOrder = Array.from(containerRef.current?.children || [])
                .map((el) => el.getAttribute('data-id'))
                .filter(Boolean) as string[];

            console.log('New plan order:', newOrder);

            // Here you would update your backend or store with the new order
            // Example: updatePlanOrder(newOrder);
        });

        return () => {
            if (sortableRef.current) {
                sortableRef.current.destroy();
                sortableRef.current = null;
            }
        };
    }, [data?.user.extension.plans]);

    return (
        <AnimatePresence>
            <div
                ref={containerRef}
                className={`grid gap-6 md:grid-cols-2 plans-container ${isDragging ? 'is-reordering' : ''}`}
            >
                {!data?.user.extension.plans?.length && <h1>No Plans Yet...</h1>}
                {data?.user.extension.plans?.map((plan: Plan) => (
                    <motion.div
                        key={plan._id}
                        data-id={plan._id}
                        className="draggable-plan-item"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        layout="position"
                        layoutDependency={isDragging}
                    >
                        <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300 relative cursor-grab active:cursor-grabbing">
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                                <div className="flex justify-between items-center no-drag-zone">
                                    <div className="space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setEditingPlan(plan)}
                                            className="hover:bg-orange-100"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => {
                                                mutate(plan);
                                            }}
                                            className="hover:bg-red-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Link href={`/plans/${plan._id}`}>
                                        <Button
                                            variant="secondary"
                                            className="bg-orange-100 hover:bg-orange-200 text-orange-600"
                                        >
                                            View Plan
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
    );
};

export default ListPlansSection;
