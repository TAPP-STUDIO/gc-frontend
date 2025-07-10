import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
    return (
        <Link href="/dashboard">
            <div className="flex items-center">
                <Image
                    src="/logos/logo.svg"
                    alt="Gavlik Capital Logo"
                    width={70}
                    height={42}
                    className="text-[#F9D523]"
                />
            </div>
        </Link>
    );
}