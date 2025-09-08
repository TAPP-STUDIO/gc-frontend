'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      icon: 'projects.svg',
      href: '/admin/nfts',
      subItems: [
        { id: 'overview', name: 'Přehled', href: '/admin/nfts' },
        { id: 'gc-cards', name: 'GC Cards', href: '/admin/nfts/gc-cards' },
        { id: 'btc-bot', name: 'BTC Bot', href: '/admin/nfts/btc-bot' },
        { id: 'algo-trader', name: 'Algo Trader', href: '/admin/nfts/algo-trader' },
        { id: 'vc-nft', name: 'VC NFT', href: '/admin/nfts/vc-nft' },
      ]
    },
    {
      id: 'users',
      name: 'Uživatelé',
      icon: 'messages.svg',
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
    // Auto-rozbal NFTs sekci pokud jsme v NFT stránce
    if (pathname?.startsWith('/admin/nfts')) {
      setExpandedItems(prev => ({
        ...prev,
        nfts: true
      }));
    }
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        
        {/* Mobile sidebar - UNIFIED GLASSMORPHISM STYLE */}
        <aside 
          className="fixed left-0 top-0 h-full w-[280px] z-50 lg:hidden overflow-y-auto"
          style={{
            background: 'linear-gradient(180deg, rgba(21, 21, 21, 0.85) 0%, rgba(21, 21, 21, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(239, 68, 68, 0.2)' // Admin červený accent
          }}
        >
          <div className="flex flex-col h-full px-4">
            {/* Header with close button and Admin badge - UNIFIED STYLE */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center">
                <Logo />
                <span className="ml-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                  ADMIN
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-white hover:text-red-400 transition-all duration-300 hover:bg-white/10 rounded-lg"
                aria-label="Zavřít admin menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Navigation - UNIFIED STYLE */}
            <nav className="flex-1 py-4">
              <ul className="space-y-1">
                {adminNavItems.map(item => (
                  <li key={item.id} className="relative">
                    <div className="mb-1">
                      {/* Hlavní link/tlačítko */}
                      {item.subItems && item.subItems.length > 0 ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleItemExpansion(item.id, e);
                          }}
                          className={`w-full flex items-center justify-between px-6 py-3 text-white transition-all duration-300 rounded-lg group ${
                            isActive(item.href) 
                              ? 'bg-white/10 border-l-2 border-red-500 text-red-400' 
                              : 'hover:bg-white/5 hover:border-l-2 hover:border-red-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="w-5 h-5 mr-3 flex items-center justify-center">
                              <Image
                                src={`/images/icons/${item.icon}`}
                                alt={item.name}
                                width={20}
                                height={20}
                                className="opacity-80 transition-all duration-300"
                                style={{
                                  filter: isActive(item.href)
                                    ? 'brightness(0) saturate(100%) invert(55%) sepia(89%) saturate(2466%) hue-rotate(342deg) brightness(99%) contrast(98%)'
                                    : 'brightness(0) saturate(100%) invert(100%)',
                                }}
                              />
                            </span>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          
                          {/* Šipka */}
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-300 ${
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
                          className={`flex items-center px-6 py-3 text-white transition-all duration-300 rounded-lg group ${
                            isActive(item.href) 
                              ? 'bg-white/10 border-l-2 border-red-500 text-red-400' 
                              : 'hover:bg-white/5 hover:border-l-2 hover:border-red-300'
                          }`}
                        >
                          <span className="w-5 h-5 mr-3 flex items-center justify-center">
                            <Image
                              src={`/images/icons/${item.icon}`}
                              alt={item.name}
                              width={20}
                              height={20}
                              className="opacity-80 transition-all duration-300"
                              style={{
                                filter: isActive(item.href)
                                  ? 'brightness(0) saturate(100%) invert(55%) sepia(89%) saturate(2466%) hue-rotate(342deg) brightness(99%) contrast(98%)'
                                  : 'brightness(0) saturate(100%) invert(100%)',
                              }}
                            />
                          </span>
                          <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                      )}
                    </div>

                    {/* Subitems */}
                    {item.subItems && item.subItems.length > 0 && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded(item.id)
                            ? `max-h-[${item.subItems.length * 40}px] opacity-100 mb-2` 
                            : 'max-h-0 opacity-0'
                        }`}
                        style={{
                          maxHeight: isExpanded(item.id) ? `${item.subItems.length * 40 + 20}px` : '0px'
                        }}
                      >
                        <ul className="ml-10 space-y-1 mt-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.id}>
                              <Link
                                href={subItem.href}
                                onClick={closeMobileMenu}
                                className={`block px-3 py-2 text-xs rounded transition-all duration-300 ${
                                  isActive(subItem.href)
                                    ? 'text-red-400 bg-white/10'
                                    : 'text-white/70 hover:text-red-300 hover:bg-white/5'
                                }`}
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

            {/* Footer sekce pro mobile - UNIFIED STYLE */}
            <div className="mt-auto pb-6 border-t border-white/10 pt-4">
              <div className="space-y-2">
                {/* Back to User Dashboard */}
                <Link
                  href="/dashboard"
                  className="flex items-center px-6 py-3 text-white/60 hover:text-red-300 hover:bg-white/5 transition-all duration-300 rounded-lg group"
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
                  className="flex items-center px-6 py-3 text-white/60 hover:text-red-300 hover:bg-white/5 transition-all duration-300 rounded-lg group"
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

  // Desktop sidebar - UNIFIED GLASSMORPHISM STYLE
  return (
    <>
      {/* Mobile menu button - UNIFIED STYLE */}
      <button
        onClick={handleMobileMenuToggle}
        className="fixed top-4 left-4 z-30 p-3 text-white hover:text-red-400 transition-all duration-300 lg:hidden rounded-lg border border-red-500/30 hover:border-red-500/60"
        style={{
          background: 'rgba(21, 21, 21, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        aria-label="Otevřít admin menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Desktop sidebar - STEJNÝ GLASSMORPHISM JAKO USER DASHBOARD */}
      <aside 
        className={`hidden lg:flex flex-col h-screen transition-all duration-300 ease-in-out overflow-hidden relative ${
          isCollapsed ? 'w-[70px]' : 'w-[240px]'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.5) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(239, 68, 68, 0.15)' // Admin červený accent, ale jemný
        }}
      >
        <div className={`flex flex-col h-full ${isCollapsed ? 'px-2' : 'px-0'}`}>
          {/* Header - logo s admin badge - UNIFIED STYLE */}
          <div className={`p-6 border-b border-white/10 ${isCollapsed ? 'text-center' : ''}`}>
            <div className="flex items-center justify-center">
              <Logo />
              {!isCollapsed && (
                <span className="ml-3 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                  ADMIN
                </span>
              )}
            </div>
          </div>

          {/* Navigation - UNIFIED STYLE JAKO USER DASHBOARD */}
          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              {adminNavItems.map(item => (
                <li key={item.id} className="relative group">
                  <div className={`${isCollapsed ? 'flex justify-center' : 'mb-1'}`}>
                    {/* Hlavní link/tlačítko */}
                    {item.subItems && item.subItems.length > 0 && !isCollapsed ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleItemExpansion(item.id, e);
                        }}
                        className={`w-full flex items-center justify-between px-6 py-3 text-white transition-all duration-300 ${
                          isActive(item.href) 
                            ? 'bg-white/10 border-l-2 border-red-500 text-red-400' 
                            : 'hover:bg-white/5 hover:border-l-2 hover:border-red-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="w-5 h-5 mr-3 flex items-center justify-center">
                            <Image
                              src={`/images/icons/${item.icon}`}
                              alt={item.name}
                              width={20}
                              height={20}
                              className="opacity-80 transition-all duration-300"
                              style={{
                                filter: isActive(item.href)
                                  ? 'brightness(0) saturate(100%) invert(55%) sepia(89%) saturate(2466%) hue-rotate(342deg) brightness(99%) contrast(98%)'
                                  : 'brightness(0) saturate(100%) invert(100%)',
                              }}
                            />
                          </span>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        
                        {/* Šipka */}
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transition-transform duration-300 ${
                            isExpanded(item.id) ? 'rotate-180' : ''
                          }`}
                        >
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`${isCollapsed ? 'p-3 rounded-lg flex items-center justify-center' : 'flex items-center px-6 py-3'} text-white transition-all duration-300 relative group ${
                          isActive(item.href) 
                            ? 'bg-white/10 border-l-2 border-red-500 text-red-400' 
                            : 'hover:bg-white/5 hover:border-l-2 hover:border-red-300'
                        }`}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <span className={`w-5 h-5 flex items-center justify-center ${!isCollapsed ? 'mr-3' : ''}`}>
                          <Image
                            src={`/images/icons/${item.icon}`}
                            alt={item.name}
                            width={20}
                            height={20}
                            className="opacity-80 transition-all duration-300"
                            style={{
                              filter: isActive(item.href)
                                ? 'brightness(0) saturate(100%) invert(55%) sepia(89%) saturate(2466%) hue-rotate(342deg) brightness(99%) contrast(98%)'
                                : 'brightness(0) saturate(100%) invert(100%)',
                            }}
                          />
                        </span>
                        {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                        
                        {/* Tooltip pro collapsed stav */}
                        {isCollapsed && (
                          <div className="sidebar-tooltip absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#1a1a1a] text-white text-sm py-2 px-3 rounded-lg shadow-lg z-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
                          ? `max-h-[${item.subItems.length * 40}px] opacity-100 mb-2` 
                          : 'max-h-0 opacity-0'
                      }`}
                      style={{
                        maxHeight: isExpanded(item.id) ? `${item.subItems.length * 40 + 20}px` : '0px'
                      }}
                    >
                      <ul className="ml-12 mt-2 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.id}>
                            <Link
                              href={subItem.href}
                              className={`block px-3 py-2 text-xs rounded transition-all duration-300 ${
                                isActive(subItem.href)
                                  ? 'text-red-400 bg-white/10'
                                  : 'text-white/70 hover:text-red-300 hover:bg-white/5'
                              }`}
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

          {/* Footer sekce - UNIFIED STYLE */}
          <div className={`mt-auto border-t border-white/10 ${isCollapsed ? 'p-2' : 'p-4'}`}>
            <div className={`space-y-1 ${isCollapsed ? 'space-y-2' : ''}`}>
              {/* Back to User Dashboard */}
              <Link
                href="/dashboard"
                className={`group flex items-center ${
                  isCollapsed ? 'justify-center p-3 rounded-lg' : 'px-6 py-3'
                } text-white/60 hover:text-red-300 hover:bg-white/5 transition-all duration-300 relative`}
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
                  <div className="sidebar-tooltip absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#1a1a1a] text-white text-sm py-2 px-3 rounded-lg shadow-lg z-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Zpět na Dashboard
                  </div>
                )}
              </Link>

              {/* Admin Dokumentace */}
              <a
                href="/admin/docs"
                className={`group flex items-center ${
                  isCollapsed ? 'justify-center p-3 rounded-lg' : 'px-6 py-3'
                } text-white/60 hover:text-red-300 hover:bg-white/5 transition-all duration-300 relative`}
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
                  <div className="sidebar-tooltip absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#1a1a1a] text-white text-sm py-2 px-3 rounded-lg shadow-lg z-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
