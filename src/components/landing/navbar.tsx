'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '../logo/logo';
import { PremiumCTA, GlassCTA } from '../ui/premium-button';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation('navbar');
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === '#') return;
    
    // Odstranit # z ID
    const cleanId = sectionId.replace('#', '');
    
    // Najít element podle ID nebo data-section
    let element = document.getElementById(cleanId);
    
    // Pokud element nebyl nalezen podle ID, zkusit data-section
    if (!element) {
      element = document.querySelector(`[data-section="${cleanId}"]`);
    }
    
    // Pokud stále nenalezen, zkusit podle textu v nadpisu (fallback)
    if (!element) {
      const headings = document.querySelectorAll('h1, h2, h3');
      headings.forEach((heading) => {
        const text = heading.textContent?.toLowerCase();
        if (text?.includes(cleanId.toLowerCase().replace('-', ' '))) {
          const section = heading.closest('section');
          if (section instanceof HTMLElement) {
            element = section;
          } else if (heading instanceof HTMLElement) {
            element = heading;
          }
        }
      });
    }
    
    if (element) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const elementPosition = element.offsetTop - navbarHeight - 20;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Zavřít mobile menu
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { name: t('menuItems.cards'), href: '#cards' },
    { name: t('menuItems.ecosystem'), href: '#ecosystem' },
    { name: t('menuItems.roadmap'), href: '#roadmap' },
    { name: t('menuItems.vipClub'), href: '#vip-club' },
    { name: t('menuItems.faq'), href: '#faq' },
    { name: t('menuItems.discord'), href: 'https://discord.gg/tcvTy6y5', external: true }
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
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <React.Fragment key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#F9D523] hover:scale-105 transition-all duration-300 text-sm font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                ) : item.href.startsWith('/') ? (
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-[#F9D523] hover:scale-105 transition-all duration-300 text-sm font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-white/80 hover:text-[#F9D523] hover:scale-105 transition-all duration-300 text-sm font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </button>
                )}
              </React.Fragment>
            ))}
            
            {/* Language Selector */}
            <div className="relative group">
              <button className="unified-button unified-button-sm inline-flex items-center justify-center font-medium transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-teal-400/40 space-x-2">
                <span>{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
                <span className="hidden sm:inline">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Language Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                      currentLanguage === lang.code ? 'text-[#F9D523] bg-white/5' : 'text-white/80'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Premium Sign Up Button */}
            <PremiumCTA 
              href="/auth/login"
              size="sm"
              className="ml-2"
            >
              {t('buttons.register')}
            </PremiumCTA>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-white hover:text-[#F9D523] hover:scale-110 transition-all duration-300"
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
                      className="block px-3 py-2 text-white/80 hover:text-[#F9D523] hover:bg-white/10 rounded-xl transition-all duration-300 text-base font-medium backdrop-blur-sm hover:scale-105"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : item.href.startsWith('/') ? (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-white/80 hover:text-[#F9D523] hover:bg-white/10 rounded-xl transition-all duration-300 text-base font-medium backdrop-blur-sm hover:scale-105"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left px-3 py-2 text-white/80 hover:text-[#F9D523] hover:bg-white/10 rounded-xl transition-all duration-300 text-base font-medium backdrop-blur-sm hover:scale-105"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-white/10 mt-4">
                <div className="px-3 mb-3">
                  <span className="text-xs font-medium text-white/50 uppercase tracking-wide">Jazyk</span>
                </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-white/10 rounded-xl transition-all duration-300 text-base font-medium ${
                        currentLanguage === lang.code ? 'text-[#F9D523] bg-white/5' : 'text-white/80'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10 mt-4">
                <GlassCTA
                  href="/auth/login"
                  size="md"
                  className="w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('buttons.register')}
                </GlassCTA>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};