'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Award, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface DegreeProgress {
    overallProgress: number;
    creditProgress: number;
    missingClasses: string[];
    completedClasses: string[];
    targetGraduation: string;
}

const DegreeProgressSection = () => {
    const [progress, setProgress] = useState(0);
    const [creditProgress, setCreditProgress] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const degreeProgress: DegreeProgress = {
        overallProgress: 65,
        creditProgress: 72,
        missingClasses: ['CS 374', 'CS 325', 'CS 494', 'CS 340', 'CS 361'],
        completedClasses: ['CS 161', 'CS 162', 'CS 225', 'CS 261', 'CS 271', 'CS 290'],
        targetGraduation: 'Spring 2026',
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(degreeProgress.overallProgress);
            setCreditProgress(degreeProgress.creditProgress);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                    <Award className="mr-2 h-5 w-5 text-orange-600" />
                    Degree Progress
                </h2>
                <div className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {degreeProgress.targetGraduation}
                </div>
            </div>

            <div className="space-y-5">
                <div>
                    <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-medium text-slate-600">Overall Completion</span>
                        <span className="font-medium text-orange-600">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-slate-100">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                    </Progress>
                </div>

                <div>
                    <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-medium text-slate-600">Credits Completed</span>
                        <span className="font-medium text-orange-600">{creditProgress}/180</span>
                    </div>
                    <Progress value={creditProgress / 1.8} className="h-2 bg-slate-100">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 ease-in-out"
                            style={{ width: `${creditProgress / 1.8}%` }}
                        />
                    </Progress>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center text-sm py-2 h-auto bg-white border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
                    >
                        <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
                        <span>{degreeProgress.completedClasses.length} Completed</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center text-sm py-2 h-auto bg-white border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                    >
                        <XCircle className="w-4 h-4 mr-2 text-red-600" />
                        <span>{degreeProgress.missingClasses.length} Remaining</span>
                    </Button>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-2 space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                                        <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
                                        Completed Courses
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {degreeProgress.completedClasses.map((cls, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded"
                                            >
                                                {cls}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                                        <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                        Remaining Required Courses
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {degreeProgress.missingClasses.map((cls, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded"
                                            >
                                                {cls}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DegreeProgressSection;
