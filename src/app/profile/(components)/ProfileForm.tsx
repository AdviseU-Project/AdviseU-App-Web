'use client';

import type React from 'react';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DegreesSection from './(sections)/DegreesSection';
import CoursesSection from './(sections)/CoursesSection';

export default function ProfileForm() {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-orange-300 focus:ring-orange-500"
                        />
                    </div>
                </CardContent>
            </Card>

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

            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                Save Profile
            </Button>
        </form>
    );
}
