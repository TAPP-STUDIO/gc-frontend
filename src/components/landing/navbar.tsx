'use client';

import React, { useState } from 'react';
import Logo from '../logo/logo';
import { PremiumCTA, GlassCTA } from '../ui/premium-button';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { name: 'Cards', href: '#cards' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'VIP club', href: '#vip-club' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Discord', href: 'https://discord.gg/gavlik-capital', external: true }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Menu - Right aligned */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <React.Fragment key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#F9D523] transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="text-white/80 hover:text-[#F9D523] transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                )}
              </React.Fragment>
            ))}
            
            {/* Premium Sign Up Button */}
            <PremiumCTA 
              href="/dashboard"
              size="sm"
              className="ml-4"
            >
              Sign Up
            </PremiumCTA>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-white hover:text-[#F9D523] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-black/20 backdrop-blur-xl shadow-2xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-white/80 hover:text-[#F9D523] hover:bg-white/10 rounded-xl transition-colors duration-200 text-base font-medium backdrop-blur-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-white/80 hover:text-[#F9D523] hover:bg-white/10 rounded-xl transition-colors duration-200 text-base font-medium backdrop-blur-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 mt-4">
                <GlassCTA
                  href="/dashboard"
                  size="md"
                  className="w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </GlassCTA>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
