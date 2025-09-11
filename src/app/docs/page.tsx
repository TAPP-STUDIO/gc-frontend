'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardCard, DashboardButton } from '@/components/dashboard';
import { Book, FileText, Video, Download, ExternalLink, Search } from 'lucide-react';

interface UserProfile {
  name: string;
  avatar?: string;
  email?: string;
  address?: string;
  kycVerified?: boolean;
}

export default function DocsPage() {
  const [userProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    kycVerified: true
  });

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'Začínáme',
      description: 'Úvodní průvodce platformou Gavlik Capital',
      icon: <Book className="w-6 h-6 text-blue-500" />,
      articles: [
        { title: 'Registrace a ověření účtu', url: '/docs/registration' },
        { title: 'První kroky na platformě', url: '/docs/first-steps' },
        { title: 'Nastavení portfolia', url: '/docs/portfolio-setup' },
        { title: 'Základy investování', url: '/docs/investment-basics' }
      ]
    },
    {
      id: 'portfolio',
      title: 'Portfolio Management',
      description: 'Správa a optimalizace vašeho investičního portfolia',
      icon: <FileText className="w-6 h-6 text-green-500" />,
      articles: [
        { title: 'GC Cards - Průvodce', url: '/docs/gc-cards' },
        { title: 'BTC BOT - Nastavení a použití', url: '/docs/btc-bot' },
        { title: 'Algo Trader - Pokročilé strategie', url: '/docs/algo-trader' },
        { title: 'Diverzifikace portfolia', url: '/docs/diversification' }
      ]
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      description: 'Obchodování a transakce na platformě',
      icon: <ExternalLink className="w-6 h-6 text-purple-500" />,
      articles: [
        { title: 'Nákup a prodej NFT', url: '/docs/nft-trading' },
        { title: 'Marketplace poplatky', url: '/docs/fees' },
        { title: 'Bezpečnost transakcí', url: '/docs/security' },
        { title: 'Historie obchodů', url: '/docs/trading-history' }
      ]
    },
    {
      id: 'technical',
      title: 'Technická dokumentace',
      description: 'API, integrace a pokročilé funkce',
      icon: <Download className="w-6 h-6 text-orange-500" />,
      articles: [
        { title: 'API dokumentace', url: '/docs/api' },
        { title: 'Webhook integrace', url: '/docs/webhooks' },
        { title: 'Smart kontrakty', url: '/docs/smart-contracts' },
        { title: 'Blockchain integrace', url: '/docs/blockchain' }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Dokumentace" 
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Dokumentace platformy</h1>
          <p className="text-white/70 text-lg max-w-3xl">
            Kompletní průvodce použitím platformy Gavlik Capital. Najděte odpovědi na všechny vaše otázky 
            a naučte se efektivně využívat všechny funkce našich investičních nástrojů.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <DashboardCard>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Hledejte v dokumentaci..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/50 focus:border-[#F9D523] focus:outline-none"
                />
              </div>
              <DashboardButton variant="primary">
                Hledat
              </DashboardButton>
            </div>
          </DashboardCard>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {documentationSections.map((section) => (
            <DashboardCard key={section.id}>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  {section.icon}
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                </div>
                <p className="text-white/70 text-sm mb-4">{section.description}</p>
              </div>
              
              <div className="space-y-2">
                {section.articles.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <span className="text-white text-sm group-hover:text-[#F9D523] transition-colors">
                      {article.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-[#F9D523] transition-colors" />
                  </a>
                ))}
              </div>
            </DashboardCard>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard className="text-center">
            <div className="py-6">
              <Video className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Video tutoriály</h3>
              <p className="text-white/70 text-sm mb-4">
                Sledujte naše video průvodce pro rychlé pochopení funkcí platformy
              </p>
              <DashboardButton variant="secondary" className="w-full">
                Přejít na YouTube
              </DashboardButton>
            </div>
          </DashboardCard>

          <DashboardCard className="text-center">
            <div className="py-6">
              <Download className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">PDF Průvodce</h3>
              <p className="text-white/70 text-sm mb-4">
                Stáhněte si kompletní průvodce ve formátu PDF pro offline použití
              </p>
              <DashboardButton variant="secondary" className="w-full">
                Stáhnout PDF
              </DashboardButton>
            </div>
          </DashboardCard>

          <DashboardCard className="text-center">
            <div className="py-6">
              <FileText className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">FAQ</h3>
              <p className="text-white/70 text-sm mb-4">
                Nejčastěji kladené otázky a rychlé odpovědi na běžné problémy
              </p>
              <DashboardButton variant="secondary" className="w-full">
                Zobrazit FAQ
              </DashboardButton>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}