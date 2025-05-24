'use client';

import type React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DegreesSection from './(sections)/DegreesSection';
import CoursesSection from './(sections)/CoursesSection';

export default function ProfileForm() {
    return (
        <>
            <div className="mb-6">
                <p className="text-muted-foreground text-base leading-relaxed">
                    Add the degrees you are pursuing and the courses you've already completed.
                </p>
            </div>
            <Tabs defaultValue="degrees" className="mb-8">
                <TabsList className="bg-orange-100">
                    <TabsTrigger
                        value="degrees"
                        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                        Degrees
                    </TabsTrigger>
                    <TabsTrigger
                        value="courses"
                        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                        Courses
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="degrees">
                    <DegreesSection />
                </TabsContent>
                <TabsContent value="courses">
                    <CoursesSection />
                </TabsContent>
            </Tabs>
        </>
    );
}
