'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';
import { usePlansStore } from '@/app/store';
import { Plan } from '@/lib/types';
import { useDeletePlan } from '@/hooks/mutations/plans';
import { useSession } from 'next-auth/react';

const ListPlansSection: React.FC = () => {
    const { setEditingPlan } = usePlansStore();
    const { data } = useSession();
    const { mutate } = useDeletePlan();

    return (
        <AnimatePresence>
            <div className="grid gap-6 md:grid-cols-2">
                {!data?.user?.extension?.plans?.length && <h1>No Plans Yet...</h1>}{' '}
                {data?.user.extension.plans.map((plan: Plan) => (
                    <motion.div
                        key={plan._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                                <div className="flex justify-between items-center">
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
