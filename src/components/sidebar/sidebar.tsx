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
        { name: 'Algo Trader', href: '/dashboard/portfolio/algo-trader' },
        { name: 'VC NFT', href: '/dashboard/portfolio/vc-nft' }
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
    }
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <div className="h-full flex flex-col bg-[#081520]/90 backdrop-blur-xl">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`flex items-center px-6 py-3 text-white transition-all duration-300 ${
                  isActive(item.href) 
                    ? 'bg-white/10 border-l-2 border-white' 
                    : 'hover:bg-white/5'
                }`}
              >
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

      {/* Profile Section */}
      <div className="p-4 border-t border-white/10 bg-[#081520]/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">User</p>
            <p className="text-xs text-white/50">Profil</p>
          </div>
        </div>
      </div>
    </div>
  );
}
