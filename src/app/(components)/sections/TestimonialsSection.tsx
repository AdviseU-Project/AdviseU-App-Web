'use client';

import { TestimonialCard } from '../testimonials-card';

const TestimonialsSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                            Testimonials
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Student Success Stories</h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Hear from students who have used AdviseU to plan their academic journey and achieve their
                            goals.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    <TestimonialCard
                        quote="AdviseU revolutionized how I planned my Computer Science courses. The intuitive interface made it easy to visualize my entire degree path."
                        author="Sebastian Torresola"
                        role="Computer Science Major"
                    />
                    <TestimonialCard
                        quote="The degree tracking feature saved me countless hours of planning. I could clearly see which requirements I still needed to fulfill."
                        author="Kai Black"
                        role="Business Information Systems Major"
                    />
                    <TestimonialCard
                        quote="As a transfer student, AdviseU helped me understand which of my previous credits would apply to my new program. Incredibly helpful!"
                        author="Nicolas Rist"
                        role="Electrical Engineering Major"
                    />
                    <TestimonialCard
                        quote="Planning my minor alongside my major was seamless with AdviseU. I could easily see how different course combinations would affect my graduation timeline."
                        author="Carson Secrest"
                        role="Computer Science Major"
                    />
                    <TestimonialCard
                        quote="The course recommendation feature helped me discover classes that aligned with my interests while still fulfilling my degree requirements."
                        author="David Gesl"
                        role="Data Science Major"
                    />
                    <TestimonialCard
                        quote="I love how AdviseU allows me to plan multiple terms at once. It gives me a clear picture of my academic journey."
                        author="Aidan McCarthy"
                        role="Mechanical Engineering Major"
                    />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
