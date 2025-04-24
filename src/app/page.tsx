import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#151515] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-8">Gavlik Capital Portfolio</h1>
                <Link
                    href="/dashboard"
                    className="btn-primary inline-block"
                >
                    Přejít na Dashboard
                </Link>
            </div>
        </div>
    );
}