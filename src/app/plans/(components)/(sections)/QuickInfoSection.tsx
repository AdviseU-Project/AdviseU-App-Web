'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, BookOpen, AlertCircle } from 'lucide-react';

const QuickInfoSection = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                Tips & Information
            </h2>

            <Tabs defaultValue="tips" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-0.5">
                    <TabsTrigger
                        value="tips"
                        className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    >
                        Planning Tips
                    </TabsTrigger>
                    <TabsTrigger
                        value="prerequisites"
                        className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    >
                        Prerequisites
                    </TabsTrigger>
                    <TabsTrigger
                        value="graduation"
                        className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm text-slate-600"
                    >
                        Graduation
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="tips" className="pt-4 px-1">
                    <ul className="space-y-2.5">
                        <li className="flex items-start">
                            <div className="mr-2 mt-1 text-amber-500">•</div>
                            <p className="text-sm text-slate-600">
                                Create separate plans for different academic scenarios you're considering.
                            </p>
                        </li>
                        <li className="flex items-start">
                            <div className="mr-2 mt-1 text-amber-500">•</div>
                            <p className="text-sm text-slate-600">
                                Balance your course load across terms to avoid overwhelming schedules.
                            </p>
                        </li>
                        <li className="flex items-start">
                            <div className="mr-2 mt-1 text-amber-500">•</div>
                            <p className="text-sm text-slate-600">
                                Use the "Generate Plan" feature to get AI-powered suggestions based on your degree
                                requirements.
                            </p>
                        </li>
                    </ul>
                </TabsContent>

                <TabsContent value="prerequisites" className="pt-4 px-1">
                    <div className="space-y-2.5">
                        <div className="flex items-start">
                            <BookOpen className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">CS 361</span> requires{' '}
                                <span className="font-medium">CS 290</span> as a prerequisite.
                            </p>
                        </div>
                        <div className="flex items-start">
                            <BookOpen className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">CS 362</span> requires{' '}
                                <span className="font-medium">CS 361</span> as a prerequisite.
                            </p>
                        </div>
                        <div className="flex items-start">
                            <BookOpen className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">CS 325</span> and{' '}
                                <span className="font-medium">CS 340</span> both require{' '}
                                <span className="font-medium">CS 261</span> as a prerequisite.
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="graduation" className="pt-4 px-1">
                    <div className="space-y-2.5">
                        <div className="flex items-start">
                            <AlertCircle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">180 credits</span> are required for graduation with a
                                Bachelor's degree.
                            </p>
                        </div>
                        <div className="flex items-start">
                            <AlertCircle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">
                                All required core courses must be completed with a grade of C or better.
                            </p>
                        </div>
                        <div className="flex items-start">
                            <AlertCircle className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">
                                Applications for graduation should be submitted at least two terms before your planned
                                graduation date.
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default QuickInfoSection;
