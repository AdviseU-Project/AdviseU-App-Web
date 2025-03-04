'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BackgroundBeams } from '@/components/ui/background-beams';

const HeroSection = () => {
    return (
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-orange-50 via-orange-50 to-white">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600">
                            Plan Your Academic Journey With Confidence
                        </h1>
                        <p className="text-gray-600 md:text-xl max-w-[800px] mx-auto">
                            AdviseU helps you navigate course selection, degree requirements, and scheduling to create
                            your perfect academic plan.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link href="/plans">
                            <Button className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-orange-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-700">
                                Get Started
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none">
                <BackgroundBeams className="opacity-75" />
            </div>
        </section>
    );
};

export default HeroSection;
