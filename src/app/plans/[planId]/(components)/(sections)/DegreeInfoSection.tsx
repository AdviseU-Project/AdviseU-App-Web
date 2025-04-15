// Icons
import { GraduationCap, Info, CheckCircle, Clock, Lightbulb, BookOpen, AlertTriangle } from 'lucide-react';

// Components
import { Badge } from '@/components/ui/badge';
import { Plan } from '@/lib/types';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface DegreeInfoSectionProps {
    plan: Plan;
}

const DegreeInfoSection = ({ plan }: DegreeInfoSectionProps) => {
    const totalCredits =
        plan?.terms?.reduce((acc, term) => {
            return (
                acc +
                (term.courses?.reduce((sum, course) => {
                    return sum + (parseInt(course.credits) || 0);
                }, 0) || 0)
            );
        }, 0) || 0;

    // Calculate credits percentage (assuming 180 credits for graduation)
    const creditsPercentage = Math.min(100, Math.round((totalCredits / 180) * 100));

    return (
        <div className="md:w-1/4 space-y-5">
            {/* Degree Progress Card */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="border-b px-4 py-3">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-orange-500" />
                        Degree Progress
                    </h3>
                </div>

                <div className="p-4 space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-700">Credits toward graduation</div>
                        <Badge variant="outline" className="bg-white text-gray-700 font-semibold">
                            {totalCredits}/180
                        </Badge>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Credits Completed</span>
                                <span className="font-medium text-gray-800">{creditsPercentage}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-in-out"
                                    style={{ width: `${creditsPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Required Courses</span>
                                <span className="font-medium text-gray-800">15/32</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '47%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Electives</span>
                                <span className="font-medium text-gray-800">8/12</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '67%' }}></div>
                            </div>
                        </div>

                        <div className="pt-3 border-t flex items-center justify-between">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-400 mr-1.5" />
                                <span className="text-sm text-gray-600">Expected Graduation</span>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700">Spring 2026</Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="border-b px-4 py-3">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-gray-400" />
                        Outstanding Requirements
                    </h3>
                </div>

                <div className="divide-y divide-gray-100">
                    {/* TODO: Replace with actual missing requirements */}
                    {['CS 325', 'CS 361', 'CS 362', 'WR 327'].map((course, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors group"
                        >
                            <div className="flex items-center">
                                <AlertTriangle className="h-3.5 w-3.5 text-orange-500 mr-2" />
                                <span className="text-sm font-medium">{course}</span>
                            </div>
                            <div className="flex items-center">
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 text-xs">
                                    Required
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <Button variant="outline" size="sm" className="w-full">
                        View Full Degree Audit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DegreeInfoSection;
