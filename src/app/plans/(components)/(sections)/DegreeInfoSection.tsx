'use client';

import { GraduationCap, ClipboardList, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DegreeInfoProps {
    studentInfo: {
        name: string;
        major: string;
        degree: string;
        minor?: string;
        gpa: number;
        creditsCompleted: number;
        totalCreditsRequired: number;
        startDate: string;
        anticipatedGraduation: string;
        academicStanding: string;
        department: string;
        advisor?: string;
    };
}

const DegreeInfoSection = ({ studentInfo }: DegreeInfoProps) => {
    const [isProgressExpanded, setIsProgressExpanded] = useState(false);

    // Format dates
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Calculate progress percentage
    const progressPercentage = Math.min(
        100,
        Math.round((studentInfo.creditsCompleted / studentInfo.totalCreditsRequired) * 100)
    );

    // Get GPA color based on value
    const getGpaColor = (gpa: number) => {
        if (gpa >= 3.5) return 'text-emerald-600';
        if (gpa >= 3.0) return 'text-blue-600';
        if (gpa >= 2.0) return 'text-amber-600';
        return 'text-red-600';
    };

    // Get academic standing badge color
    const getStandingColor = (standing: string) => {
        switch (standing.toLowerCase()) {
            case 'good standing':
                return 'bg-emerald-100 text-emerald-800';
            case "dean's list":
                return 'bg-blue-100 text-blue-800';
            case 'probation':
                return 'bg-amber-100 text-amber-800';
            case 'warning':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    };

    // Mock data for degree progress
    const degreeProgress = {
        overallProgress: 65,
        missingClasses: ['CS 374', 'CS 325', 'CS 494', 'CS 340', 'CS 361'],
        completedClasses: ['CS 161', 'CS 162', 'CS 225', 'CS 261', 'CS 271', 'CS 290'],
        targetGraduation: 'Spring 2026',
    };

    return (
        <div className="divide-y divide-slate-200">
            {/* Header section with title */}
            <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-800 flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-orange-600" />
                    Your Academic Profile
                </h3>
            </div>

            {/* Basic Degree Information */}
            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-700">Degree Information</h4>
                    <Badge className={getStandingColor(studentInfo.academicStanding)}>
                        {studentInfo.academicStanding}
                    </Badge>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <div className="text-xs text-slate-500">Major</div>
                        <div className="text-sm font-medium">{studentInfo.major}</div>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-xs text-slate-500">Degree</div>
                        <div className="text-sm font-medium">{studentInfo.degree}</div>
                    </div>

                    {studentInfo.minor && (
                        <div className="flex justify-between">
                            <div className="text-xs text-slate-500">Minor</div>
                            <div className="text-sm font-medium">{studentInfo.minor}</div>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <div className="text-xs text-slate-500">Department</div>
                        <div className="text-sm font-medium text-right">{studentInfo.department}</div>
                    </div>
                </div>
            </div>

            {/* Progress & Performance Section (Combined) */}
            <div className="p-5 space-y-4">
                <h4 className="font-medium text-slate-700 flex items-center mb-3">Degree Progress</h4>

                <div className="flex items-center justify-between">
                    <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">GPA</div>
                        <div className={`text-xl font-bold ${getGpaColor(studentInfo.gpa)}`}>
                            {studentInfo.gpa.toFixed(2)}
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-xs text-slate-500 mb-1">Expected Graduation</div>
                        <div className="flex items-center justify-end text-sm">
                            <Clock className="h-3.5 w-3.5 mr-1 text-orange-500" />
                            <span className="font-medium">{formatDate(studentInfo.anticipatedGraduation)}</span>
                        </div>
                    </div>
                </div>

                {/* Overall Degree Completion */}
                <div>
                    <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-slate-500">Degree Completion</span>
                        <span className="text-xs font-medium text-orange-600">{degreeProgress.overallProgress}%</span>
                    </div>
                    <Progress value={degreeProgress.overallProgress} className="h-1.5 bg-slate-100">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                            style={{ width: `${degreeProgress.overallProgress}%` }}
                        />
                    </Progress>
                </div>

                {/* Course Completion Status */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsProgressExpanded(!isProgressExpanded)}
                        className="flex items-center justify-center text-xs h-auto py-1.5 bg-white border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
                    >
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                        <span>{degreeProgress.completedClasses.length} Complete</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setIsProgressExpanded(!isProgressExpanded)}
                        className="flex items-center justify-center text-xs h-auto py-1.5 bg-white border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                    >
                        <XCircle className="w-3.5 h-3.5 mr-1.5 text-red-600" />
                        <span>{degreeProgress.missingClasses.length} Needed</span>
                    </Button>
                </div>

                {/* Detailed Course Completion View */}
                {isProgressExpanded && (
                    <div className="pt-2 space-y-3 animate-in fade-in duration-200">
                        <div>
                            <h5 className="text-xs font-medium text-slate-700 mb-2 flex items-center">
                                <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                                Completed Courses
                            </h5>
                            <div className="flex flex-wrap gap-1.5">
                                {degreeProgress.completedClasses.map((cls, index) => (
                                    <span
                                        key={index}
                                        className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded"
                                    >
                                        {cls}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h5 className="text-xs font-medium text-slate-700 mb-2 flex items-center">
                                <XCircle className="w-3.5 h-3.5 mr-1 text-red-600" />
                                Remaining Required Courses
                            </h5>
                            <div className="flex flex-wrap gap-1.5">
                                {degreeProgress.missingClasses.map((cls, index) => (
                                    <span key={index} className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">
                                        {cls}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Advisor Section */}
            {studentInfo.advisor && (
                <div className="p-5">
                    <div className="flex items-center">
                        <ClipboardList className="h-4 w-4 mr-2 text-slate-400" />
                        <div>
                            <div className="text-xs text-slate-500">Academic Advisor</div>
                            <div className="font-medium text-sm">{studentInfo.advisor}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DegreeInfoSection;
