'use client';

import { Spotlight } from '@/components/ui/spotlight';

const DemoSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                            See It In Action
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Watch How AdviseU Works
                        </h2>
                        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our intuitive interface makes it easy to plan your academic journey. Watch the demo to see
                            how AdviseU can help you stay on track for graduation.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="mx-auto rounded-xl bg-white shadow-lg w-full p-3 md:p-4">
                            <div className="w-full aspect-video overflow-hidden rounded-lg shadow-inner bg-gray-100">
                                <div className="w-full h-full relative">
                                    <Spotlight className="w-full h-full" />
                                    <div className="flex items-center justify-center h-full absolute inset-0">
                                        <video
                                            preload="metadata"
                                            autoPlay
                                            muted
                                            loop
                                            className="w-full h-full object-cover rounded-lg"
                                        >
                                            <source src="/videos/demo.mov" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
