'use client';

import React from 'react';
import { Plan, Term } from '@/lib/types';
import { ChevronRight, Calendar, Info } from 'lucide-react';
import DroppableTermContainer from './DroppableTermContainer';
import CourseCard from '@/components/CourseCard';

interface PlanListViewProps {
    planId: string;
    plan: Plan;
}

const PlanListView: React.FC<PlanListViewProps> = ({ planId, plan }) => {
    if (!plan.terms || plan.terms.length === 0) {
        return null;
    }

    return (
        <div className="p-1">
            <div className="space-y-3">
                {plan.terms.map((term) => (
                    <TermListItem key={term._id.toString()} term={term} planId={planId} />
                ))}
            </div>
        </div>
    );
};

interface TermListItemProps {
    term: Term;
    planId: string;
}

const TermListItem: React.FC<TermListItemProps> = ({ term, planId }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const courseCount = term.courses?.length || 0;
    const creditCount =
        term.courses?.reduce((total, course) => {
            const credits = parseFloat(course.credits) || 0;
            return total + credits;
        }, 0) || 0;

    return (
        <DroppableTermContainer term={term}>
            <div className="border rounded-lg overflow-hidden bg-white transition-colors">
                <div
                    className="flex items-center justify-between p-3 cursor-pointer transition-colors hover:bg-gray-50"
                    onClick={toggleExpand}
                >
                    <div className="flex items-center gap-3">
                        <Calendar className="text-orange-500" size={18} />
                        <div>
                            <h3 className="font-medium">{term.name}</h3>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                                <span>
                                    {courseCount} course{courseCount !== 1 ? 's' : ''}
                                </span>
                                <span>•</span>
                                <span>
                                    {creditCount} credit{creditCount !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ChevronRight
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                            size={18}
                        />
                    </div>
                </div>

                {isExpanded && (
                    <div className="p-3 space-y-2">
                        {courseCount === 0 ? (
                            <div className="flex flex-col items-center py-4 text-center">
                                <Info size={24} className="text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">No courses added to this term yet</p>
                                <p className="text-xs text-gray-400 mt-1">Drag courses here from the search panel</p>
                            </div>
                        ) : (
                            term.courses?.map((course, index) => (
                                <CourseCard key={index} planId={planId} course={course} term={term} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </DroppableTermContainer>
    );
};

export default PlanListView;
