'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CTASection = () => {
    return (
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-orange-600 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Ready to Start Planning Your Academic Future?
                        </h2>
                        <p className="max-w-[600px] text-orange-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Join thousands of students who are using AdviseU to plan their academic journey and achieve
                            their goals.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-end">
                        <Link href="/plans">
                            <Button className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-orange-600 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-700">
                                Get Started Today
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button
                                variant="outline"
                                className="inline-flex h-10 items-center justify-center rounded-md border border-orange-200 bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-700 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-300"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
