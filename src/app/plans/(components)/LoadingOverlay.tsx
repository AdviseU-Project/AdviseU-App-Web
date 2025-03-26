'use client';

import { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Calendar, CheckCircle, Brain } from 'lucide-react';
import { createPortal } from 'react-dom';

interface LoadingOverlayProps {
    isLoading: boolean;
    onClose?: () => void; // Kept for API compatibility but not used
}

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Educational tips to display while loading
    const educationalTips = [
        {
            icon: <GraduationCap className="h-12 w-12 text-orange-500 mb-3" />,
            title: 'Plan Your Prerequisites',
            content:
                'Always plan prerequisite courses in earlier terms to unlock advanced courses later in your academic journey.',
        },
        {
            icon: <BookOpen className="h-12 w-12 text-orange-500 mb-3" />,
            title: 'Balance Your Workload',
            content:
                'Distribute difficult courses across terms to maintain a manageable workload throughout your academic career.',
        },
        {
            icon: <Calendar className="h-12 w-12 text-orange-500 mb-3" />,
            title: 'Consider Course Offerings',
            content:
                'Some courses are only offered in specific terms. Factor this into your long-term planning to avoid graduation delays.',
        },
        {
            icon: <CheckCircle className="h-12 w-12 text-orange-500 mb-3" />,
            title: 'Track Degree Requirements',
            content:
                "Regularly check your degree audit to ensure you're making progress toward all graduation requirements.",
        },
        {
            icon: <Brain className="h-12 w-12 text-orange-500 mb-3" />,
            title: 'Explore Electives Strategically',
            content:
                'Choose electives that complement your major and help you develop valuable skills for your career goals.',
        },
    ];

    // Set mounted state when component mounts
    useEffect(() => {
        setMounted(true);

        // Lock scroll when overlay is shown
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            setMounted(false);
            document.body.style.overflow = '';
        };
    }, [isLoading]);

    // Update progress bar
    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + 0.5;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return newProgress;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [isLoading]);

    // Cycle through tips every 5 seconds
    useEffect(() => {
        if (!isLoading) return;

        const tipTimer = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % educationalTips.length);
        }, 5000);

        return () => clearInterval(tipTimer);
    }, [isLoading, educationalTips.length]);

    if (!isLoading || !mounted) return null;

    const currentTip = educationalTips[tipIndex];

    // Prevent any click events from bubbling through
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const overlayContent = (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[9999] flex items-center justify-center bg-black/60"
            style={{
                position: 'fixed',
                pointerEvents: 'all',
                width: '100vw',
                height: '100vh',
            }}
            onClick={stopPropagation}
        >
            <div
                className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden border-0"
                onClick={stopPropagation}
                style={{ pointerEvents: 'all', position: 'relative', zIndex: 10000 }}
            >
                {/* Close button removed */}

                <div
                    className="p-8 bg-white flex flex-col items-center justify-center min-h-[300px]"
                    style={{ pointerEvents: 'all' }}
                >
                    <div className="animate-bounce">{currentTip.icon}</div>

                    <h3 className="text-xl font-bold text-orange-600 mb-2 text-center">{currentTip.title}</h3>

                    <p className="text-sm text-gray-700 mb-6 text-center max-w-xs">{currentTip.content}</p>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <div className="mt-5 text-center">
                        <h4 className="text-lg font-bold text-orange-600 mb-2">Generating Your Optimal Plan</h4>
                        <p className="text-sm text-gray-500">
                            Our super secret algorithm is analyzing course prerequisites, requirements, and your
                            preferences to create the best possible degree plan. This may take up to 30 seconds.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    // Use a portal to render the overlay directly into the document body
    return createPortal(
        <div style={{ pointerEvents: 'auto', position: 'absolute', inset: 0, zIndex: 9999 }}>{overlayContent}</div>,
        document.body
    );
};

export default LoadingOverlay;
