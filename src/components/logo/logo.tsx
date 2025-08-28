import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
    return (
        <Link href="/dashboard">
            <div className="flex items-center">
                <Image
                    src="/logos/logo.svg"
                    alt="Gavlik Capital Logo"
                    width={85}
                    height={51}
                    className="text-[#F9D523]"
                />
            </div>
        </Link>
    );
}