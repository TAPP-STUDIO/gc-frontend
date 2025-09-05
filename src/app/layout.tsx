import './globals.css';
import type { Metadata } from 'next';
import ClientProviders from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
    title: 'Gavlik Capital Portfolio',
    description: 'Dashboard pro správu portfolia Gavlik Capital',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="cs">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        </head>
        <body>
            <ClientProviders>
                {children}
            </ClientProviders>
        </body>
        </html>
    );
}