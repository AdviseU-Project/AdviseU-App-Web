'use client';

import HeroSection from './(components)/sections/HeroSection';
import FeaturesSection from './(components)/sections/FeaturesSection';
import DemoSection from './(components)/sections/DemoSection';
import TestimonialsSection from './(components)/sections/TestimonialsSection';
import PricingSection from './(components)/sections/PricingSection';
import CTASection from './(components)/sections/CTASection';
import Footer from '@/components/Footer';

export default function LandingPage() {
    return (
        <div className="bg-white">
            <HeroSection />
            <FeaturesSection />
            <DemoSection />
            {/* <TestimonialsSection /> */}
            {/* <PricingSection /> */}
            <CTASection />
            <Footer />
        </div>
    );
}
