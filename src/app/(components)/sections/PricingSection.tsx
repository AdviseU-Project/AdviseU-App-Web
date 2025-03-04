'use client';

import { PricingCard } from '../pricing-card';

const PricingSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                            Pricing
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Choose the plan that's right for your academic journey.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-16">
                    <PricingCard
                        title="Basic"
                        price="Free"
                        description="Get started with basic academic planning."
                        features={[
                            'Create up to 2 academic plans',
                            'Basic course search',
                            'Term planning',
                            'Standard support',
                        ]}
                        buttonText="Get Started"
                        buttonVariant="outline"
                    />
                    <PricingCard
                        title="Pro"
                        price="$4.99"
                        period="per month"
                        description="Everything you need for comprehensive planning."
                        features={[
                            'Unlimited academic plans',
                            'Advanced course search',
                            'Degree requirement tracking',
                            'Course recommendations',
                            'Priority support',
                        ]}
                        buttonText="Get Pro"
                        buttonVariant="default"
                        highlighted={true}
                    />
                    <PricingCard
                        title="Premium"
                        price="$9.99"
                        period="per month"
                        description="Advanced features for serious academic planning."
                        features={[
                            'Everything in Pro',
                            'AI schedule generation',
                            'Multi-degree planning',
                            'Academic advisor consultations',
                            '24/7 premium support',
                        ]}
                        buttonText="Get Premium"
                        buttonVariant="outline"
                    />
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
