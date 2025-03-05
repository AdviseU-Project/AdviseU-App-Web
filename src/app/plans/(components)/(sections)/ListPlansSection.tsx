'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Layers, Plus } from 'lucide-react';
import { usePlansStore } from '@/app/store';
import { Plan } from '@/lib/types';
import { useDeletePlan } from '@/hooks/mutations/plans';
import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';

import CreatePlanSection from './CreatePlanSection';
import PlanCard from '../plan-card';

const ListPlansSection: React.FC = () => {
    const { setEditingPlan } = usePlansStore();
    const { data } = useSession();
    const { mutate } = useDeletePlan();
    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg border border-slate-100 relative z-10 mt-0 mb-6">
                {/* Plans Section */}
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-md font-semibold text-slate-800 flex items-center lg:text-xl">
                            <Calendar className="mr-2 text-orange-600 h-5 w-5" />
                            Your Degree Plans
                        </h2>
                        <div className="items-center gap-3 hidden md:flex">
                            {data?.user?.extension?.plans && data.user.extension.plans.length > 0 && (
                                <Badge variant="outline" className="text-slate-600 font-normal py-1 px-2">
                                    {data.user.extension.plans.length}{' '}
                                    {data.user.extension.plans.length === 1 ? 'Plan' : 'Plans'}
                                </Badge>
                            )}
                            <Button
                                onClick={() => setCreateModalOpen(true)}
                                size="sm"
                                className="bg-orange-600 hover:bg-orange-700 transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4 mr-1" /> Create Plan
                            </Button>
                        </div>
                    </div>

                    {!data?.user?.extension?.plans?.length ? (
                        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center bg-slate-50">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                                <Layers className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-slate-800">No Plans Created Yet</h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Get started by creating your first degree plan using the Create Plan button above.
                            </p>
                            <Button
                                onClick={() => setCreateModalOpen(true)}
                                className="mt-4 bg-orange-600 hover:bg-orange-700"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Create Your First Plan
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2">
                            {data?.user.extension.plans.map((plan: Plan, index: number) => (
                                <PlanCard
                                    key={plan._id}
                                    plan={plan}
                                    onEdit={() => {
                                        setEditingPlan(plan);
                                    }}
                                    onDelete={() => {
                                        mutate(plan);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Plan Modal */}
            <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-xl">
                            <Plus className="mr-2 h-5 w-5 text-orange-600" />
                            Create New Degree Plan
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <CreatePlanSection onPlanCreated={() => setCreateModalOpen(false)} />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ListPlansSection;
