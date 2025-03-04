'use client';

import React from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import TermCard from '../TermCard';
import { useSession } from 'next-auth/react';
import AddTermDialog from '../AddTermDialog';

const PlanOverviewSection = ({ planId }: { planId: string }) => {
    const controls = useAnimation();
    const { data } = useSession();

    const terms = data?.user?.extension?.plans.find((plan) => plan._id === planId)?.terms;

    return (
        <div className="w-full overflow-x-auto flex flex-col bg-white/80 backdrop-blur-sm shadow-xl rounded-xl">
            <div className="flex justify-between items-center px-10 py-4">
                <h1 className="text-xl font-bold">Plan Overview</h1>
                <AddTermDialog planId={planId} variant="outline" />
            </div>
            <hr className="w-full border-gray-300" />
            <motion.div
                className="flex justify-center items-center gap-3 min-h-72 p-8"
                animate={controls}
                transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            >
                <AnimatePresence>
                    {terms?.length ? (
                        terms.map((term, termIndex) => <TermCard planId={planId} key={termIndex} term={term} />)
                    ) : (
                        <div className="flex flex-col items-center gap-5">
                            <img src="/images/clipboard.svg" alt="Clipboard" width={100} height={100} />
                            <p className="text-gray-600 text-sm">No terms added to this plan yet :(</p>
                            <AddTermDialog planId={planId} variant="outline" />
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PlanOverviewSection;
