'use client';

import React from 'react';
import { Plan, Term } from '@/lib/types';
import { ChevronRight, Calendar, Info, BookOpen, GraduationCap } from 'lucide-react';
import DroppableTermContainer from './DroppableTermContainer';
import CourseCard from '@/components/CourseCard';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanListViewProps {
    planId: string;
    plan: Plan;
}

const PlanListView: React.FC<PlanListViewProps> = ({ planId, plan }) => {
    if (!plan.terms || plan.terms.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4 bg-gray-50 rounded-lg">
                <GraduationCap className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Terms Added Yet</h3>
                <p className="text-gray-500 text-center">
                    Add terms to your plan to start building your academic journey
                </p>
            </div>
        );
    }

    return (
        <div className="py-2">
            {plan.terms.map((term) => (
                <TermListItem key={term._id.toString()} term={term} planId={planId} />
            ))}
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
            <div
                className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-all hover:shadow border-l-4 border-l-orange-300`}
            >
                <div className="bg-gray-50 cursor-pointer transition-colors hover:bg-gray-100" onClick={toggleExpand}>
                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                            <Calendar className="text-orange-700" size={18} />
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
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                                {creditCount} cr
                            </Badge>
                            <ChevronRight
                                className={`transition-transform duration-200 text-gray-400 ${
                                    isExpanded ? 'rotate-90' : ''
                                }`}
                                size={18}
                            />
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="p-3 space-y-2 border-t">
                                {courseCount === 0 ? (
                                    <div className="flex flex-col items-center py-6 text-center bg-gray-50 rounded-lg">
                                        <BookOpen size={24} className="text-gray-300 mb-2" />
                                        <p className="text-sm text-gray-500">No courses added to this term yet</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Drag courses here from the search panel
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        {term.courses?.map((course, index) => (
                                            <motion.div
                                                key={course._id.toString()}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <CourseCard key={index} planId={planId} course={course} term={term} />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DroppableTermContainer>
    );
};

export default PlanListView;
