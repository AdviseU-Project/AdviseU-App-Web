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
        <div className="w-full bg-gradient-to-r from-orange-600 to-orange-700 pt-12 pb-44">
            <div className="px-4 flex flex-col gap-1 items-center container">
                <h1 className="text-2xl font-bold text-white">Degree Plan - {plan.name}</h1>
            </div>
        </div>
    );
};

export default PageHeaderSection;
