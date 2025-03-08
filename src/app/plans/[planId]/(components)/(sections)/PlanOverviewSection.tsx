'use client';

import React from 'react';
import TermCard from '../TermCard';
import AddTermDialog from '../AddTermDialog';
import { Plan } from '@/lib/types';
import { useTermsStore } from '@/app/store';
import { BookOpen, Calendar, Grid, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PlanListView from '../PlanListView';

interface PlanOverviewSectionProps {
    plan: Plan;
    planId: string;
}

const PlanOverviewSection: React.FC<PlanOverviewSectionProps> = ({ plan, planId }) => {
    const { selectedTerm } = useTermsStore();

    return (
        <div className="flex flex-col gap-2 bg-white rounded-lg shadow-lg h-min">
            <div className="border-b">
                <Tabs defaultValue="grid" className="">
                    <div className="flex justify-between items-center border-b py-3 px-7">
                        <div className="flex items-center gap-3">
                            <BookOpen className="h-6 w-6 text-orange-500" />
                            <h2 className="text-xl font-semibold">Plan Overview</h2>
                        </div>
                        <TabsList className="bg-gray-100 p-1 rounded-md">
                            <TabsTrigger
                                value="grid"
                                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                            >
                                <div className="flex items-center gap-1.5">
                                    <Grid className="h-4 w-4 text-blue-500" />
                                    <span className="hidden sm:inline">Grid</span>
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                value="list"
                                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                            >
                                <div className="flex items-center gap-1.5">
                                    <List className="h-4 w-4 text-blue-500" />
                                    <span className="hidden sm:inline">List</span>
                                </div>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    {!plan.terms ||
                        (plan.terms.length === 0 && (
                            <div className="text-center py-10">
                                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                <h3 className="text-lg font-medium text-gray-700 mb-2">No Terms Added Yet</h3>
                                <p className="text-gray-500 mb-4">Start by adding a term to your plan</p>
                                <AddTermDialog planId={planId} variant="default" />
                            </div>
                        ))}

                    <TabsContent value="grid" className="my-4 px-7">
                        <div className="flex p-1 gap-6 overflow-x-auto">
                            {plan!.terms.map((term, index) => (
                                <TermCard key={index} term={term} selectedTerm={selectedTerm || term} planId={planId} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="list" className="my-4 px-7">
                        <PlanListView plan={plan} planId={planId} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PlanOverviewSection;
