'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingOverlayProps {
    isLoading: boolean;
    onClose?: () => void; // Still keep this for API compatibility
}

const YouTubeLoadingOverlay = ({ isLoading, onClose }: LoadingOverlayProps) => {
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // List of YouTube Shorts IDs
    const shortsIds = [
        'bbI6_A7RP7o',
        'ujED5HrXRjI',
        'PK4dqWAxXZY',
        '4U9pfkg7mA8',
        'Hy5naxJRODg',
        'yXaSxg4JTwA',
        'oc991pjpMkI',
    ];

    // Set mounted state when component mounts and pick a random starting point
    useEffect(() => {
        setMounted(true);
        // Randomly select a starting index
        const randomIndex = Math.floor(Math.random() * shortsIds.length);
        setCurrentIndex(randomIndex);

        // Also freeze the background scroll when overlay is shown
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

    if (!isLoading || !mounted) return null;

    // Prevent clicks from bubbling through
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Navigate to previous short
    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : shortsIds.length - 1));
    };

    // Navigate to next short
    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev < shortsIds.length - 1 ? prev + 1 : 0));
    };

    const currentShortId = shortsIds[currentIndex];

    const overlayContent = (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[9999] flex items-center justify-center bg-black/60"
            style={{
                position: 'fixed',
                pointerEvents: 'all',
            }}
            onClick={stopPropagation}
        >
            <div
                className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden border-0"
                onClick={stopPropagation}
                style={{ pointerEvents: 'all' }}
            >
                <div
                    className="bg-white flex flex-col items-center justify-center pt-6"
                    style={{ pointerEvents: 'all' }}
                >
                    {/* Container for YouTube Shorts and navigation buttons */}
                    <div className="w-full max-w-[320px] mx-auto flex items-center relative">
                        {/* YouTube Shorts container with aspect ratio for vertical video */}
                        <div
                            className="aspect-[9/16] bg-gray-900 overflow-hidden rounded-lg mx-auto"
                            style={{ pointerEvents: 'all' }}
                        >
                            {currentShortId && (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${currentShortId}?autoplay=1&controls=1&loop=1&rel=0`}
                                    title="YouTube Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ pointerEvents: 'auto' }}
                                ></iframe>
                            )}
                        </div>

                        {/* Navigation buttons on the absolute right side */}
                        <div className="absolute right-[-3rem] top-1/2 -translate-y-1/2 flex flex-col gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-full border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100"
                                onClick={handlePrevious}
                                title="Previous video"
                            >
                                <ChevronUp className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-full border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100"
                                onClick={handleNext}
                                title="Next video"
                            >
                                <ChevronDown className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    <div className="p-5 text-center">
                        <h4 className="text-lg font-bold text-orange-600 mb-2">Generating Your Optimal Plan</h4>
                        <p className="text-sm text-gray-500">
                            Our super secret algorithm is analyzing course prerequisites, requirements, and your
                            preferences to create the best possible degree plan. This may take up to 30 seconds.
                        </p>

                        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                            <div
                                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Use a portal to render the overlay directly into the document body
    return createPortal(
        // Add a wrapper with pointer-events: all to ensure capturing all interactions
        <div style={{ pointerEvents: 'auto' }}>{overlayContent}</div>,
        document.body
    );
};

export default YouTubeLoadingOverlay;
