'use client';

import React from 'react';
import { Plan } from '@/lib/types';
import { ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageHeaderSectionProps {
    plan: Plan;
}

const PageHeaderSection = ({ plan }: PageHeaderSectionProps) => {
    const totalCourses = plan.terms.reduce((acc, term) => acc + (term.courses?.length || 0), 0);

    return (
        <div className="w-full bg-white border-b py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center mb-2">
                    <Link href="/plans">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 -ml-2">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Plans
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{plan.name}</h1>
                        {plan.description && <p className="text-gray-600 mt-1 max-w-xl text-sm">{plan.description}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <Calendar className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">{plan.terms.length} Terms</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <BookOpen className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">{totalCourses} Courses</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeaderSection;
