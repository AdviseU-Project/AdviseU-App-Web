import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-xl font-bold text-orange-600 mb-4">AdviseU</h2>
                        <p className="text-sm">
                            Empowering students to make informed decisions about their academic journey.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold text-black mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:text-orange-600">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-orange-600">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-orange-600">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-orange-600">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold text-black mb-4">Connect With Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:text-orange-600">
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-orange-600">
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-orange-600">
                                    LinkedIn
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-orange-600">
                                    Instagram
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
