'use client';

import React from 'react';
import TermCard from '../TermCard';
import AddTermDialog from '../AddTermDialog';
import { Plan } from '@/lib/types';
import { useTermsStore } from '@/app/store';
import { BookOpen, Calendar, Grid, List, PlusCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PlanListView from '../PlanListView';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PlanOverviewSectionProps {
    plan: Plan;
    planId: string;
}

const PlanOverviewSection: React.FC<PlanOverviewSectionProps> = ({ plan, planId }) => {
    const { selectedTerm } = useTermsStore();

    // Total credits across all terms
    const totalCredits = plan.terms.reduce((total, term) => {
        return total + (term.courses?.reduce((sum, course) => sum + (parseInt(course.credits) || 0), 0) || 0);
    }, 0);

    return (
        <div className="flex flex-col gap-2 bg-white rounded-lg border shadow-sm h-min">
            <Tabs defaultValue="grid" className="">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-3 px-6 gap-3">
                    <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-orange-500" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Academic Terms</h2>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                <span>{plan.terms.length} terms</span>
                                <span>•</span>
                                <span>{totalCredits} total credits</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <AddTermDialog planId={planId} variant="outline" />

                        <TabsList className="p-1 rounded-md">
                            <TabsTrigger
                                value="grid"
                                className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-800"
                            >
                                <div className="flex items-center gap-1.5">
                                    <Grid className="h-4 w-4" />
                                    <span className="hidden sm:inline">Grid</span>
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                value="list"
                                className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-800"
                            >
                                <div className="flex items-center gap-1.5">
                                    <List className="h-4 w-4" />
                                    <span className="hidden sm:inline">List</span>
                                </div>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                {!plan.terms || plan.terms.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-gray-50">
                        <div className="bg-gray-100 rounded-full p-3 mx-auto w-fit mb-3">
                            <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No Terms Added Yet</h3>
                        <p className="text-gray-600 mb-5 max-w-md mx-auto">
                            Start building your academic plan by adding terms for each quarter or semester.
                        </p>
                        <AddTermDialog planId={planId} variant="default" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="grid" className="pb-6 pt-4 px-6">
                            <div className="flex gap-6 overflow-x-auto p-2">
                                {plan.terms.map((term, index) => (
                                    <TermCard
                                        key={index}
                                        term={term}
                                        selectedTerm={selectedTerm || term}
                                        planId={planId}
                                    />
                                ))}
                                <div className="min-w-[150px] h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                                    <PlusCircle className="h-12 w-12 text-gray-300 mb-3" />
                                    <AddTermDialog planId={planId} variant="secondary" />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="list" className="py-4 px-6">
                            <PlanListView plan={plan} planId={planId} />
                        </TabsContent>
                    </>
                )}

                {plan.terms && plan.terms.length > 0 && (
                    <div className="border-t border-gray-100 bg-gray-50 rounded-b-lg p-3 flex justify-between items-center">
                        <Badge variant="outline" className="bg-gray-100 text-gray-700">
                            {totalCredits} total credits
                        </Badge>

                        <Button variant="link" className="text-orange-600 p-0 h-auto text-sm">
                            Check graduation requirements
                        </Button>
                    </div>
                )}
            </Tabs>
        </div>
    );
};

export default PlanOverviewSection;
