'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, Edit, Trash2, Eye } from 'lucide-react';
import { Plan } from '@/lib/types';

interface PlanCardProps {
    plan: Plan;
    onEdit?: (plan: Plan) => void;
    onDelete?: (plan: Plan) => void;
    isDeleting?: boolean;
}

export function PlanCard({ plan, onEdit, onDelete, isDeleting }: PlanCardProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-stretch">
                {/* Left color bar indicating plan status */}
                <div className="w-1.5 bg-orange-500 flex-shrink-0"></div>

                {/* Main content */}
                <div className="flex-grow p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800">{plan.name}</h3>

                        <div className="flex space-x-1">
                            {onEdit && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(plan);
                                    }}
                                    className="h-6 w-6 text-slate-500 hover:text-orange-600 hover:bg-orange-50"
                                >
                                    <Edit className="h-3 w-3" />
                                </Button>
                            )}
                            {onDelete && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(plan);
                                    }}
                                    disabled={isDeleting}
                                    className="h-6 w-6 text-slate-500 hover:text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Plan stats */}
                    <div className="flex items-center mb-3">
                        <div className="flex items-center text-xs text-slate-600">
                            <Calendar className="h-3.5 w-3.5 text-orange-400 mr-1" />
                            <span className="text-slate-600 font-medium">
                                {plan.terms?.length || 0} {plan.terms?.length === 1 ? 'Term' : 'Terms'}
                            </span>
                        </div>
                        {plan.terms && (
                            <div className="flex ml-3 pl-3 border-l border-slate-200">
                                <BookOpen className="h-3.5 w-3.5 text-slate-400 mr-1" />
                                <span className="text-xs text-slate-600">
                                    {plan.terms.reduce((acc, term) => acc + (term.courses?.length || 0), 0)} Courses
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Description and action button */}
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500 line-clamp-1 max-w-[70%]">
                            {plan.description || 'No description provided.'}
                        </p>
                        <Link href={`/plans/${plan._id}`} className="no-underline">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                            >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanCard;
