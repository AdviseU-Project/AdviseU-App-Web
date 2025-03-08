// Icons
import { GraduationCap, Info, CheckCircle } from 'lucide-react';

// Components
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plan } from '@/lib/types';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';

interface DegreeInfoSectionProps {
    plan: Plan;
}

const DegreeInfoSection = ({ plan }: DegreeInfoSectionProps) => {
    const { data } = useSession();

    const totalCredits =
        plan?.terms?.reduce((acc, term) => {
            return (
                acc +
                (term.courses?.reduce((sum, course) => {
                    return sum + (parseInt(course.credits) || 0);
                }, 0) || 0)
            );
        }, 0) || 0;

    return (
        <div className="md:w-1/4 space-y-6">
            {/* Plan Info */}
            <div className="bg-white rounded-xl border shadow-sm p-5">
                <h3 className="font-semibold mb-4 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-orange-500" />
                    Plan Details
                </h3>
                <div className="space-y-3">
                    <div>
                        <div className="text-xs text-gray-500">Description</div>
                        {plan?.description ? (
                            <div className="text-sm">{plan.description}</div>
                        ) : (
                            <Skeleton className="w-20 h-4" />
                        )}
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">Created</div>
                        <div className="text-sm">March 2, 2025</div>
                    </div>
                </div>
            </div>

            {/* Degree Progress */}
            <div className="bg-white rounded-xl border shadow-sm p-5">
                <h3 className="font-semibold mb-4 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-orange-500" />
                    Degree Progress
                </h3>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Credits Completed</span>
                            <span className="font-medium">{totalCredits}/180</span>
                        </div>
                        <Progress value={(totalCredits / 180) * 100} className="h-2" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Required Courses</span>
                            <span className="font-medium">15/32</span>
                        </div>
                        <Progress value={(15 / 32) * 100} className="h-2" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Electives</span>
                            <span className="font-medium">8/12</span>
                        </div>
                        <Progress value={(8 / 12) * 100} className="h-2" />
                    </div>

                    <div className="pt-3 border-t">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Expected Graduation</span>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                                Spring 2026
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl border shadow-sm p-5">
                <h3 className="font-semibold mb-4 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-orange-500" />
                    Outstanding Requirements
                </h3>

                <div className="space-y-2">
                    {['CS 325', 'CS 361', 'CS 362', 'WR 327'].map((course, index) => (
                        <div key={index} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                            <span className="text-sm">{course}</span>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700">
                                Required
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DegreeInfoSection;
