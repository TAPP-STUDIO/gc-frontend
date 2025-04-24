"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../logo/logo';
import { useState, useEffect } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const navItems = [
        { id: 1, name: 'Portfolio', icon: 'dashboard.svg', href: '/dashboard/portfolio', submenu: [
                { id: 'gc-cards', name: 'GC Cards', href: '/dashboard/portfolio/gc-cards' },
                { id: 'btc-bot', name: 'BTC BOT', href: '/dashboard/portfolio/btc-bot' },
                { id: 'algo-trader', name: 'Algo Trader', href: '/dashboard/portfolio/algo-trader' },
                { id: 'vc-nft', name: 'VC NFT', href: '/dashboard/portfolio/vc-nft' },
            ] },
        { id: 2, name: 'Projekty', icon: 'projects.svg', href: '/dashboard/projects' },
        { id: 3, name: 'Marketplace', icon: 'marketplace.svg', href: '/dashboard/marketplace' },
        { id: 4, name: 'Oznámení', icon: 'messages.svg', href: '/dashboard/messages' },
    ];

    // Funkce pro zjištění, zda je menu item aktivní
    const isActive = (href: string) => {
        return pathname === href || pathname?.startsWith(href + '/');
    };

    // Sledování změn cesty a automatické rozbalení položek
    useEffect(() => {
        const newExpandedItems = {...expandedItems};

        navItems.forEach(item => {
            if (item.submenu && isActive(item.href)) {
                newExpandedItems[item.id] = true;
            }
        });

        setExpandedItems(newExpandedItems);
    }, [pathname]);

    // Přepnutí rozbalení/sbalení položky
    const toggleItemExpansion = (itemId: number, e: React.MouseEvent) => {
        e.preventDefault();
        setExpandedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    // Kontrola, zda je položka rozbalená
    const isExpanded = (itemId: number) => {
        // Portfolio je vždy rozbalené, pokud je aktivní
        if (itemId === 1 && isActive('/dashboard/portfolio')) {
            return true;
        }
        return !!expandedItems[itemId];
    };

    return (
        <aside className="w-[200px] h-screen bg-[#151515] flex flex-col px-4">
            {/* Logo */}
            <div className="pt-6 pb-10 flex items-start">
                <Logo />
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <ul className="space-y-6">
                    {navItems.map((item) => (
                        <li key={item.id} className="relative">
                            <div className="flex items-center mb-2">
                                <Link
                                    href={item.href}
                                    className={`flex-grow flex items-center ${isActive(item.href) ? 'text-[#F9D523]' : 'text-white'} hover:text-[#F9D523]`}
                                >
                  <span className="w-6 h-6 mr-3 flex items-center justify-center">
                    <img
                        src={`/images/icons/${item.icon}`}
                        alt={item.name}
                        width={24}
                        height={24}
                        className={`${isActive(item.href) ? 'filter-yellow' : 'filter-white'}`}
                        style={{ filter: isActive(item.href) ? 'invert(80%) sepia(40%) saturate(1000%) hue-rotate(360deg) brightness(105%) contrast(105%)' : 'brightness(0) invert(1)' }}
                    />
                  </span>
                                    {item.name}
                                </Link>

                                {item.submenu && (
                                    <button
                                        onClick={(e) => toggleItemExpansion(item.id, e)}
                                        className={`w-6 h-6 flex items-center justify-center text-white hover:text-[#F9D523] focus:outline-none transition-transform duration-200 ${isExpanded(item.id) ? 'rotate-180' : ''}`}
                                    >
                                        <svg
                                            width="10"
                                            height="6"
                                            viewBox="0 0 10 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`${isActive(item.href) ? 'text-[#F9D523]' : 'text-white'}`}
                                        >
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Submenu s animací */}
                            {item.submenu && (
                                <div
                                    className={`ml-9 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded(item.id) ? 'max-h-80 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
                                >
                                    <ul className="space-y-3 mt-3">
                                        {item.submenu.map((subItem: any) => (
                                            <li key={subItem.id}>
                                                <Link
                                                    href={subItem.href}
                                                    className={`block py-1 ${isActive(subItem.href) ? 'text-[#F9D523]' : 'text-white'} hover:text-[#F9D523]`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}