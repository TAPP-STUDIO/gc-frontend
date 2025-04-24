import Sidebar from '../components/sidebar/sidebar';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 overflow-auto animated-bg">
                <div className="min-h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}