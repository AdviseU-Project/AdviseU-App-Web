import { ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
        <div className="relative overflow-hidden rounded-lg border bg-white p-2">
            <div className="flex h-full flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                    {icon}
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
};
