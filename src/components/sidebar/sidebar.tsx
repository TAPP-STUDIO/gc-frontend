'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Logo from '../logo/logo';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    {
      id: 'portfolio',
      name: 'Moje portfolio',
      icon: '/images/icons/dashboard.svg',
      href: '/dashboard/portfolio',
      subItems: [
        { name: 'GC Cards', href: '/dashboard/portfolio/gc-cards' },
        { name: 'BTC BOT', href: '/dashboard/portfolio/btc-bot' },
        { name: 'Algo Trader', href: '/dashboard/portfolio/algo-trader' }
      ]
    },
    {
      id: 'projects',
      name: 'Projekty',
      icon: '/images/icons/projects.svg',
      href: '/dashboard/projects',
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      icon: '/images/icons/marketplace.svg',
      href: '/dashboard/marketplace',
      comingSoon: true
    },
    {
      id: 'messages',
      name: 'Oznámení',
      icon: '/images/icons/messages.svg',
      href: '/dashboard/messages',
    },
    {
      id: 'vip',
      name: 'VIP',
      icon: '/images/icons/vip.svg',
      href: '/dashboard/vip',
      comingSoon: true
    }
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <div 
      className="h-full flex flex-col"
      style={{
        background: 'linear-gradient(180deg, rgba(21, 21, 21, 0.3) 0%, rgba(21, 21, 21, 0.5) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`flex items-center justify-between px-6 py-3 text-white transition-all duration-300 ${
                  isActive(item.href) 
                    ? 'bg-white/10 border-l-2 border-[#F9D523]' 
                    : 'hover:bg-white/5 hover:border-l-2 hover:border-white/20'
                }`}
              >
                <div className="flex items-center">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="mr-3 opacity-80"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(100%)'
                    }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.comingSoon && (
                  <span className="text-xs px-2 py-1 bg-gradient-to-r from-[#F9D523] to-[#B29819] text-black rounded-full font-medium">
                    Soon
                  </span>
                )}
              </Link>
              
              {/* Sub Items */}
              {item.subItems && isActive(item.href) && (
                <ul className="ml-12 mt-2 space-y-1">
                  {item.subItems.map(subItem => (
                    <li key={subItem.href}>
                      <Link
                        href={subItem.href}
                        className={`block px-3 py-2 text-xs text-white/70 rounded transition-all ${
                          pathname === subItem.href
                            ? 'text-white bg-white/10'
                            : 'hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Links - Professional Support */}
      <div className="border-t border-white/10 py-4">
        <div className="px-6 mb-3">
          <span className="text-xs font-medium text-white/50 uppercase tracking-wide">Podpora & Zdroje</span>
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className="flex items-center px-6 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs font-medium">Hlavní stránka</span>
            </Link>
          </li>
          <li>
            <Link
              href="/docs"
              className="flex items-center px-6 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-medium">Dokumentace</span>
            </Link>
          </li>
          <li>
            <Link
              href="/support"
              className="flex items-center px-6 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
              </svg>
              <span className="text-xs font-medium">Zákaznická podpora</span>
            </Link>
          </li>
        </ul>
      </div>


    </div>
  );
}
