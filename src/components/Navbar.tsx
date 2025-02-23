import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { auth } from '@/lib/auth';
import SignIn from '@/components/SignIn';
import SignOut from '@/components/SignOut';
import Link from 'next/link';

const Navbar: React.FC = async () => {
    const session = await auth();

    return (
        <nav className="px-20 flex h-14 items-center justify-between shadow-md w-screen">
            {/* Large screen sizes */}
            <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                    <Image
                        src="/images/AdviseU-Logo.png"
                        alt="AdviseU Logo"
                        className="h-8 w-8"
                        width={320}
                        height={320}
                    />
                    <span className="hidden font-bold sm:inline-block">AdviseU</span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/plans">
                        Your Plans
                    </Link>
                    <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/profile">
                        Profile
                    </Link>
                </nav>
            </div>

            {/* Authentication button */}
            <div className="ml-auto">{session?.user ? <SignOut /> : <SignIn />}</div>

            {/* Small screen sizes
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </div> */}
        </nav>
    );
};

export default Navbar;
