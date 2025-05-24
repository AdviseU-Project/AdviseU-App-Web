import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { auth } from '@/lib/auth';
import SignIn from '@/components/SignIn';
import SignOut from '@/components/SignOut';
import Link from 'next/link';
import MobileMenu from './MobileMenu'; // This will be a client component

const Navbar: React.FC = async () => {
    const session = await auth();

    return (
        <header>
            <nav className="bg-gradient-to-r from-orange-50 via-white to-orange-50 border-b border-orange-100 px-4 md:px-6 lg:px-20 flex h-16 items-center justify-between w-full sticky top-0 z-50 shadow-sm">
                {/* Logo and navigation links */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105 shadow-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                            <Image
                                src="/images/AdviseU-Logo.png"
                                alt="AdviseU Logo"
                                className="h-10 w-10 object-cover relative z-10"
                                width={320}
                                height={320}
                            />
                        </div>
                        <span className="hidden font-bold text-lg sm:inline-block text-orange-600 group-hover:text-orange-500 transition-colors">
                            AdviseU
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            className="font-medium text-gray-700 hover:text-orange-600 transition-colors relative py-1.5 after:absolute after:w-0 after:h-0.5 after:bg-orange-500 after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
                            href="/profile"
                        >
                            Profile
                        </Link>
                        <Link
                            className="font-medium text-gray-700 hover:text-orange-600 transition-colors relative py-1.5 after:absolute after:w-0 after:h-0.5 after:bg-orange-500 after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
                            href="/plans"
                        >
                            Your Plans
                        </Link>
                    </nav>
                </div>

                {/* Authentication and mobile menu */}
                <div className="flex items-center gap-2">
                    {session?.user ? <SignOut /> : <SignIn />}

                    {/* Mobile menu client component */}
                    <div className="md:hidden">
                        <MobileMenu />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
