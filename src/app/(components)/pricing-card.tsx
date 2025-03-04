'use client';

import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

interface PricingCardProps {
    title: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonVariant: 'default' | 'outline';
    highlighted?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
    title,
    price,
    period,
    description,
    features,
    buttonText,
    buttonVariant,
    highlighted = false,
}) => {
    return (
        <div className={`relative ${highlighted ? 'pt-4 mt-0 md:-mt-4 lg:-mt-6' : ''}`}>
            {highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-orange-600 text-white text-xs px-4 py-1.5 rounded-full font-semibold shadow-md">
                        Popular
                    </div>
                </div>
            )}
            <div
                className={`relative overflow-hidden rounded-lg ${
                    highlighted
                        ? 'border-orange-600 border-2 shadow-lg md:scale-105 bg-orange-50'
                        : 'border border-gray-200 bg-white'
                } p-6`}
            >
                <div className="flex h-full flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold mb-4">{title}</h3>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">{price}</span>
                                {period && <span className="ml-1 text-sm text-gray-500">{period}</span>}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{description}</p>
                        </div>
                        <ul className="mt-6 space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8">
                        <Button
                            variant={buttonVariant}
                            className={`w-full ${highlighted ? 'bg-orange-600 hover:bg-orange-700 text-white' : ''}`}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
