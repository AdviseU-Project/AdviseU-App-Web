'use client';

import { CalendarCheck, GraduationCap, Brain, CalendarRange, MapPin, Clock } from 'lucide-react';
import { FeatureCard } from '@/app/(components)/feature-card';

const FeaturesSection = () => {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-50 via-white to-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                            Features
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            AdviseU provides all the tools you need to plan your academic journey and stay on track for
                            graduation.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    <FeatureCard
                        icon={<CalendarCheck className="h-10 w-10 text-orange-600" />}
                        title="Course Planning"
                        description="Search and add courses to your plan with real-time prerequisite checking and term scheduling."
                    />
                    <FeatureCard
                        icon={<GraduationCap className="h-10 w-10 text-orange-600" />}
                        title="Degree Tracking"
                        description="Track your progress toward completion of your degree requirements."
                    />
                    <FeatureCard
                        icon={<Brain className="h-10 w-10 text-orange-600" />}
                        title="AI Recommendations"
                        description="Get personalized course recommendations based on your academic history and goals."
                    />
                    <FeatureCard
                        icon={<CalendarRange className="h-10 w-10 text-orange-600" />}
                        title="Multi-term Planning"
                        description="Plan your entire academic journey across multiple terms and years."
                    />
                    <FeatureCard
                        icon={<MapPin className="h-10 w-10 text-orange-600" />}
                        title="Graduation Path"
                        description="Visualize your path to graduation and ensure you're taking the right courses at the right time."
                    />
                    <FeatureCard
                        icon={<Clock className="h-10 w-10 text-orange-600" />}
                        title="Schedule Generation"
                        description="Automatically generate optimal course schedules based on your preferences and requirements."
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
