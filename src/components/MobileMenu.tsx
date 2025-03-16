'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutGrid, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close menu when route changes or on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div>
            <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {isOpen && (
                <div className="absolute top-16 left-0 right-0 bg-gradient-to-b from-orange-50 to-white z-50 border-b border-orange-100 shadow-md animate-in fade-in slide-in-from-top-5 duration-300">
                    <div className="flex flex-col p-4 space-y-2 max-w-md mx-auto">
                        <Link
                            href="/plans"
                            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                                pathname === '/plans'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                            }`}
                        >
                            <LayoutGrid className="h-5 w-5" />
                            <span className="font-medium">Your Plans</span>
                        </Link>
                        <Link
                            href="/profile"
                            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                                pathname === '/profile'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                            }`}
                        >
                            <UserCircle className="h-5 w-5" />
                            <span className="font-medium">Profile</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
