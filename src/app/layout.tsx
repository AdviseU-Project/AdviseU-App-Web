import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from './providers';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
    src: '../../public/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: '../../public/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'AdviseU',
    description: 'Create your academic plan with ease',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/AdviseU-Logo.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="google-site-verification" content="uqO0kEl4syyua_A1JtoEkcOmh7Mhcs4FQDkBmk0f1D4" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
                <Toaster />
                <Analytics />
            </body>
        </html>
    );
}
