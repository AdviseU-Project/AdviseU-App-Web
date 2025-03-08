import { scrolltoHash } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-orange-600">AdviseU</h2>
                        <p className="text-sm max-w-xs">
                            Empowering students to make informed decisions about their academic journey.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Button
                                    variant="ghost"
                                    onClick={() => scrolltoHash('home')}
                                    className="hover:text-orange-600 p-0 m-0 h-min"
                                >
                                    Home
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="ghost"
                                    onClick={() => scrolltoHash('features')}
                                    className="hover:text-orange-600 p-0 m-0 h-min"
                                >
                                    Features
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="ghost"
                                    onClick={() => scrolltoHash('demo')}
                                    className="hover:text-orange-600 p-0 m-0 h-min"
                                >
                                    View Demo
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="ghost"
                                    onClick={() => scrolltoHash('contact')}
                                    className="hover:text-orange-600 p-0 m-0 h-min"
                                >
                                    Contact
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">Connect With Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="https://github.com/AdviseU-Project" className="hover:text-orange-600">
                                    Github
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-sm">© {new Date().getFullYear()} AdviseU. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
