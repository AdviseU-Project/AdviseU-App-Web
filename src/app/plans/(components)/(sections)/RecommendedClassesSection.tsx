'use client';

import { Badge } from '@/components/ui/badge';
import { CompassIcon, ClockIcon, Brain, BookOpen, BarChart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface RecommendedClass {
    code: string;
    name: string;
    credits: number;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    interest: 'High' | 'Medium' | 'Low';
    reason: string;
}

export default function RecommendedClassesSection() {
    const recommendedClasses: RecommendedClass[] = [
        {
            code: 'CS 325',
            name: 'Analysis of Algorithms',
            credits: 4,
            difficulty: 'Hard',
            interest: 'High',
            reason: 'Required for your degree and unlocks several upper-division courses.',
        },
        {
            code: 'CS 340',
            name: 'Databases',
            credits: 4,
            difficulty: 'Moderate',
            interest: 'High',
            reason: 'Core requirement and valuable for most software development roles.',
        },
        {
            code: 'CS 372',
            name: 'Computer Networks',
            credits: 4,
            difficulty: 'Moderate',
            interest: 'Medium',
            reason: 'Complements your web development focus area.',
        },
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-emerald-100 text-emerald-800';
            case 'Moderate':
                return 'bg-amber-100 text-amber-800';
            case 'Hard':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    };

    const getInterestColor = (interest: string) => {
        switch (interest) {
            case 'High':
                return 'bg-orange-100 text-orange-800';
            case 'Medium':
                return 'bg-blue-100 text-blue-800';
            case 'Low':
                return 'bg-slate-100 text-slate-800';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                <CompassIcon className="mr-2 h-5 w-5 text-orange-600" />
                Recommended Courses
            </h2>

            <div className="space-y-2.5">
                {recommendedClasses.map((course, index) => (
                    <motion.div
                        key={course.code}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.2 }}
                        className="p-3 rounded-lg border border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/20 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-1.5">
                            <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
                                <h3 className="font-medium text-slate-800">{course.code}</h3>
                            </div>
                            <Badge variant="outline" className="flex items-center border-slate-200">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                {course.credits} cr
                            </Badge>
                        </div>

                        <p className="text-sm text-slate-800 mb-1.5">{course.name}</p>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{course.reason}</p>

                        <div className="flex flex-wrap gap-1.5">
                            <span
                                className={`text-xs px-2 py-0.5 rounded flex items-center ${getDifficultyColor(
                                    course.difficulty
                                )}`}
                            >
                                <BarChart className="w-3 h-3 mr-1" />
                                {course.difficulty}
                            </span>
                            <span
                                className={`text-xs px-2 py-0.5 rounded flex items-center ${getInterestColor(
                                    course.interest
                                )}`}
                            >
                                <Brain className="w-3 h-3 mr-1" />
                                {course.interest} Match
                            </span>
                        </div>
                    </motion.div>
                ))}

                <Button
                    variant="ghost"
                    className="w-full mt-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50 group"
                    size="sm"
                >
                    <span>View All Recommendations</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </div>
    );
}
