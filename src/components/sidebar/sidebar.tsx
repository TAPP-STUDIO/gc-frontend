'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../logo/logo';
import { useState, useEffect } from 'react';

type PortfolioItem = {
  id: string;
  name: string;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  // Menu
  const navItems = [
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: 'dashboard.svg',
      href: '/dashboard/portfolio',
    },
    {
      id: 'projects',
      name: 'Projekty',
      icon: 'projects.svg',
      href: '/dashboard/projects',
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      icon: 'marketplace.svg',
      href: '/dashboard/marketplace',
    },
    {
      id: 'messages',
      name: 'Oznámení',
      icon: 'messages.svg',
      href: '/dashboard/messages',
    },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      // Zatím staticky pro vývoj/design – později nahradíš voláním API
      const data: PortfolioItem[] = [
        { id: 'gc-cards', name: 'GC Cards' },
        // Můžeš přidat další testovací položky
      ];
      setPortfolioItems(data);
    };

    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    const newExpanded = { ...expandedItems };
    if (portfolioItems.length > 0 && isActive('/dashboard/portfolio')) {
      newExpanded['portfolio'] = true;
    }
    setExpandedItems(newExpanded);
  }, [pathname, portfolioItems]);

  const toggleItemExpansion = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const isExpanded = (itemId: string) => {
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
          {navItems.map(item => (
            <li key={item.id} className="relative">
              <div className="flex items-center mb-2">
                <Link
                  href={item.href}
                  className={`flex-grow flex items-center ${
                    isActive(item.href) ? 'text-[#F9D523]' : 'text-white'
                  } hover:text-[#F9D523]`}
                >
                  <span className="w-6 h-6 mr-3 flex items-center justify-center">
                    <img
                      src={`/images/icons/${item.icon}`}
                      alt={item.name}
                      width={24}
                      height={24}
                      className={`${isActive(item.href) ? 'filter-yellow' : 'filter-white'}`}
                      style={{
                        filter: isActive(item.href)
                          ? 'invert(80%) sepia(40%) saturate(1000%) hue-rotate(360deg) brightness(105%) contrast(105%)'
                          : 'brightness(0) invert(1)',
                      }}
                    />
                  </span>
                  {item.name}
                </Link>

                {item.id === 'portfolio' && portfolioItems.length > 0 && (
                  <button
                    onClick={(e) => toggleItemExpansion(item.id, e)}
                    className={`w-6 h-6 flex items-center justify-center text-white hover:text-[#F9D523] focus:outline-none transition-transform duration-200 ${
                      isExpanded(item.id) ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${isActive(item.href) ? 'text-[#F9D523]' : 'text-white'}`}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Portfolio submenu */}
              {item.id === 'portfolio' && portfolioItems.length > 0 && (
                <div
                  className={`ml-9 overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded(item.id) ? 'max-h-80 opacity-100 mb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-3 mt-3">
                    {portfolioItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={`/dashboard/portfolio/${subItem.id}`}
                          className={`block py-1 ${
                            isActive(`/dashboard/portfolio/${subItem.id}`)
                              ? 'text-[#F9D523]'
                              : 'text-white'
                          } hover:text-[#F9D523]`}
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