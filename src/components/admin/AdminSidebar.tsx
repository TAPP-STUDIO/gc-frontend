'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../logo/logo';
import { useState, useEffect } from 'react';

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function AdminSidebar({ isCollapsed = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin menu items
  const adminNavItems = [
    {
      id: 'overview',
      name: 'Přehled',
      icon: 'dashboard.svg',
      href: '/admin',
    },
    {
      id: 'nfts',
      name: 'NFT Projekty',
      icon: 'projects.svg', // Použijeme stávající ikonu
      href: '/admin/nfts',
      subItems: [
        { id: 'gc-cards', name: 'GC Cards', href: '/admin/nfts/gc-cards' },
        { id: 'btc-bot', name: 'BTC Bot', href: '/admin/nfts/btc-bot' },
        { id: 'algo-trader', name: 'Algo Trader', href: '/admin/nfts/algo-trader' },
        { id: 'vc-nft', name: 'VC NFT', href: '/admin/nfts/vc-nft' },
      ]
    },
    {
      id: 'users',
      name: 'Uživatelé',
      icon: 'messages.svg', // Dočasně použijeme stávající ikonu
      href: '/admin/users',
    },
    {
      id: 'rewards',
      name: 'Odměny & Dividendy',
      icon: 'marketplace.svg',
      href: '/admin/rewards',
    },
    {
      id: 'contracts',
      name: 'Smart Kontrakty',
      icon: 'dashboard.svg',
      href: '/admin/contracts',
    },
    {
      id: 'portfolio',
      name: 'Portfolio Management',
      icon: 'dashboard.svg',
      href: '/admin/portfolio',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: 'projects.svg',
      href: '/admin/analytics',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(href);
  };

  useEffect(() => {
    const newExpanded = { ...expandedItems };
    // Auto-rozbal NFTs sekci pokud jsme v NFT stránce
    if (pathname?.startsWith('/admin/nfts')) {
      newExpanded['nfts'] = true;
    }
    setExpandedItems(newExpanded);
  }, [pathname]);

  const toggleItemExpansion = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const isExpanded = (itemId: string) => {
    return expandedItems[itemId];
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Mobile overlay
  if (isMobileMenuOpen) {
    return (
      <>
        {/* Mobile overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
        
        {/* Mobile sidebar */}
        <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#151515] z-50 lg:hidden border-r border-[#333333] overflow-y-auto">
          <div className="flex flex-col h-full px-4">
            {/* Header with close button and Admin badge */}
            <div className="flex items-center justify-between pt-6 pb-6">
              <div className="flex items-center">
                <Logo />
                <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase">
                  ADMIN
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-white hover:text-[#F9D523] transition-colors"
                aria-label="Zavřít admin menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-6">
                {adminNavItems.map(item => (
                  <li key={item.id} className="relative">
                    <div className="flex items-center mb-2">
                      {/* Hlavní link/tlačítko */}
                      {item.subItems && item.subItems.length > 0 ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleItemExpansion(item.id, e);
                          }}
                          className={`flex-grow flex items-center justify-between ${
                            isActive(item.href) ? 'text-[#F9D523]' : 'text-white'
                          } hover:text-[#F9D523] transition-colors text-left`}
                        >
                          <div className="flex items-center">
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
                          </div>
                          
                          {/* Šipka */}
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-200 ${
                              isExpanded(item.id) ? 'rotate-180' : ''
                            }`}
                          >
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={`flex-grow flex items-center ${
                            isActive(item.href) ? 'text-[#F9D523]' : 'text-white'
                          } hover:text-[#F9D523] transition-colors`}
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
                      )}
                    </div>

                    {/* Subitems */}
                    {item.subItems && item.subItems.length > 0 && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded(item.id)
                            ? `max-h-[${item.subItems.length * 40}px] opacity-100 mb-4` 
                            : 'max-h-0 opacity-0'
                        }`}
                        style={{
                          maxHeight: isExpanded(item.id) ? `${item.subItems.length * 40 + 20}px` : '0px'
                        }}
                      >
                        <ul className="space-y-3 mt-3">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.id}>
                              <Link
                                href={subItem.href}
                                onClick={closeMobileMenu}
                                className={`block py-1 ${
                                  isActive(subItem.href)
                                    ? 'text-[#F9D523]'
                                    : 'text-white'
                                } hover:text-[#F9D523] transition-colors`}
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

            {/* Footer sekce pro mobile */}
            <div className="mt-auto pb-4 border-t border-[#333333] pt-4">
              <div className="space-y-3 mb-4">
                {/* Back to User Dashboard */}
                <Link
                  href="/dashboard"
                  className="flex items-center text-[#666666] hover:text-[#F9D523] transition-colors"
                >
                  <span className="w-5 h-5 mr-3 flex items-center justify-center">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                  </span>
                  <span className="text-sm">Zpět na Dashboard</span>
                </Link>

                {/* Admin Docs */}
                <a
                  href="/admin/docs"
                  className="flex items-center text-[#666666] hover:text-[#F9D523] transition-colors"
                >
                  <span className="w-5 h-5 mr-3 flex items-center justify-center">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  </span>
                  <span className="text-sm">Admin Docs</span>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={handleMobileMenuToggle}
        className="fixed top-4 left-4 z-30 p-2 bg-[#151515] text-white hover:text-red-500 transition-colors lg:hidden border border-red-500 rounded-md"
        aria-label="Otevřít admin menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Desktop sidebar */}
      <aside 
        className={`hidden lg:flex flex-col h-screen bg-[#151515] border-r border-red-500/30 transition-all duration-300 ease-in-out overflow-hidden relative ${
          isCollapsed ? 'w-[70px]' : 'w-[200px]'
        }`}
      >
        <div className={`flex flex-col h-full ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {/* Header - logo s admin badge */}
          <div className={`flex items-center pt-6 pb-10 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
            <div className={`transition-all duration-300 ${isCollapsed ? 'scale-75' : 'scale-100'}`}>
              <div className="flex items-center">
                <Logo />
                {!isCollapsed && (
                  <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase">
                    ADMIN
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className={`space-y-6 ${isCollapsed ? 'space-y-4' : ''}`}>
              {adminNavItems.map(item => (
                <li key={item.id} className="relative group">
                  <div className={`${isCollapsed ? 'flex justify-center' : 'flex items-center mb-2'}`}>
                    {/* Hlavní link/tlačítko */}
                    {item.subItems && item.subItems.length > 0 && !isCollapsed ? (
                      // Položka s rozbalením - celý řádek je klikatelný
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleItemExpansion(item.id, e);
                        }}
                        className={`flex-grow flex items-center justify-between ${
                          isActive(item.href) ? 'text-[#F9D523]' : 'text-white'
                        } hover:text-[#F9D523] transition-colors text-left`}
                      >
                        <div className="flex items-center">
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
                        </div>
                        
                        {/* Šipka */}
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transition-transform duration-200 ${
                            isExpanded(item.id) ? 'rotate-180' : ''
                          }`}
                        >
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    ) : (
                      // Normální link
                      <Link
                        href={item.href}
                        className={`${isCollapsed ? 'p-3 rounded-lg' : 'flex-grow flex items-center'} ${
                          isActive(item.href) ? 'text-[#F9D523]' : 'text-white'
                        } hover:text-[#F9D523] transition-colors relative`}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <span className={`w-6 h-6 flex items-center justify-center ${!isCollapsed ? 'mr-3' : ''}`}>
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
                        {!isCollapsed && item.name}
                        
                        {/* Tooltip pro collapsed stav */}
                        {isCollapsed && (
                          <div className="sidebar-tooltip absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#1a1a1a] text-white text-sm py-1 px-2 rounded shadow-lg z-50 whitespace-nowrap">
                            {item.name}
                          </div>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* Subitems - pouze pro nekolapsovaný stav */}
                  {item.subItems && item.subItems.length > 0 && !isCollapsed && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded(item.id)
                          ? `max-h-[${item.subItems.length * 40}px] opacity-100 mb-4` 
                          : 'max-h-0 opacity-0'
                      }`}
                      style={{
                        maxHeight: isExpanded(item.id) ? `${item.subItems.length * 40 + 20}px` : '0px'
                      }}
                    >
                      <ul className="space-y-3 mt-3">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.id}>
                            <Link
                              href={subItem.href}
                              className={`block py-1 ${
                                isActive(subItem.href)
                                  ? 'text-[#F9D523]'
                                  : 'text-white'
                              } hover:text-[#F9D523] transition-colors`}
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

          {/* Footer sekce */}
          <div className={`mt-auto pb-4 border-t border-[#333333] pt-4 ${isCollapsed ? 'px-1' : 'px-0'}`}>
            <div className={`space-y-3 mb-4 ${isCollapsed ? 'space-y-2' : ''}`}>
              {/* Back to User Dashboard */}
              <Link
                href="/dashboard"
                className={`group flex items-center ${
                  isCollapsed ? 'justify-center p-2 rounded-lg' : ''
                } text-[#666666] hover:text-[#F9D523] transition-colors relative`}
                title={isCollapsed ? "Zpět na Dashboard" : undefined}
              >
                <span className={`w-5 h-5 flex items-center justify-center ${!isCollapsed ? 'mr-3' : ''}`}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  </svg>
                </span>
                {!isCollapsed && <span className="text-sm">Zpět na Dashboard</span>}
                
                {/* Tooltip pro collapsed stav */}
                {isCollapsed && (
                  <div className="sidebar-tooltip absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#1a1a1a] text-white text-sm py-1 px-2 rounded shadow-lg z-50 whitespace-nowrap">
                    Zpět na Dashboard
                  </div>
                )}
              </Link>

              {/* Admin Dokumentace */}
              <a
                href="/admin/docs"
                className={`group flex items-center ${
                  isCollapsed ? 'justify-center p-2 rounded-lg' : ''
                } text-[#666666] hover:text-[#F9D523] transition-colors relative`}
                title={isCollapsed ? "Admin Docs" : undefined}
              >
                <span className={`w-5 h-5 flex items-center justify-center ${!isCollapsed ? 'mr-3' : ''}`}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </span>
                {!isCollapsed && <span className="text-sm">Admin Docs</span>}
                
                {/* Tooltip pro collapsed stav */}
                {isCollapsed && (
                  <div className="sidebar-tooltip absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#1a1a1a] text-white text-sm py-1 px-2 rounded shadow-lg z-50 whitespace-nowrap">
                    Admin Docs
                  </div>
                )}
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
