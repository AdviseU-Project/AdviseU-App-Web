'use client';

import { Course } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft, Building, Calendar, CheckCircle, Clock, Info } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';

const CourseDetailsDialog = ({ course }: { course: Course }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full hover:bg-blue-50"
                    onClick={() => setIsOpen(true)}
                >
                    <Info className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
                <DialogHeader className="p-4 border-b sticky top-0 bg-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mb-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setIsOpen(false)}
                            >
                                <ArrowLeft size={16} />
                            </Button>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {course.department}
                            </Badge>
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                                {course.credits} Credits
                            </Badge>
                        </div>
                    </div>
                    <DialogTitle className="text-xl font-semibold p-0 text-left">
                        {course.course_number}: {course.course_name}
                    </DialogTitle>
                </DialogHeader>

                <div className="p-4 overflow-y-auto flex-1">
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h3>
                        <DialogDescription className="text-gray-700">{course.description}</DialogDescription>
                    </div>

                    {course.prerequisites && course.prerequisites.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Prerequisites</h3>
                            <div className="flex flex-wrap gap-4">
                                {course.prerequisites.map((prereq, index) => (
                                    <Badge key={index} variant="outline" className="bg-gray-50">
                                        {prereq}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 flex items-center">
                                <Calendar size={16} className="mr-2" />
                                Typically Offered
                            </h3>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Fall
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Spring
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 flex items-center">
                                <Clock size={16} className="mr-2" />
                                Estimated Workload
                            </h3>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                10-12 hours/week
                            </Badge>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Sections</h3>
                        <div className="space-y-3">
                            <div className="border rounded-lg p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium">Section 001</div>
                                        <div className="text-sm text-gray-600">Prof. Johnson</div>
                                    </div>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        43/180 seats
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>MWF 10:10-11:00am</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Building size={14} />
                                        <span>LINC 200</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium">Section 002</div>
                                        <div className="text-sm text-gray-600">Prof. Smith</div>
                                    </div>
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                        <AlertCircle size={14} className="mr-1" />
                                        8/120 seats
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>TR 1:25-2:40pm</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Building size={14} />
                                        <span>KEAR 212</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-4 border-t bg-white/90 rounded-b-lg">
                    <div className="text-sm text-gray-500">
                        <CheckCircle size={16} className="inline mr-1" />
                        <span>This course counts toward your degree requirements</span>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CourseDetailsDialog;
