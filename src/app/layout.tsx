import './globals.css';
import type { Metadata } from 'next';

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
        <body>
        {children}
        </body>
        </html>
    );
}