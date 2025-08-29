'use client';

import React/*, { useState } */from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
import { EnhancedValueCard } from '@/components/cards';

export default function NFTsAdminPage() {
  //const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const nftProjects = [
    {
      id: 'gc-cards',
      name: 'GC Cards',
      symbol: 'GCC',
      contractAddress: '0x1234...5678',
      totalMinted: 3420,
      maxSupply: 10000,
      floorPrice: 0.25,
      volume24h: 12.5,
      holders: 1247,
      royalties: 5.0,
      status: 'active',
      lastMint: '2 min ago',
      revenue: 85600,
      description: 'Investiční karty s garantovaným výnosem a možností tradingu na sekundárním trhu.',
      features: ['Dividendy', 'Premium Access', 'Trading'],
      mintPrice: 0.20,
      publicSaleDate: '2024-01-15',
    },
    {
      id: 'btc-bot',
      name: 'BTC Bot',
      symbol: 'BTCB',
      contractAddress: '0x8765...4321',
      totalMinted: 1850,
      maxSupply: 5000,
      floorPrice: 0.8,
      volume24h: 8.3,
      holders: 892,
      royalties: 7.5,
      status: 'active',
      lastMint: '15 min ago',
      revenue: 148000,
      description: 'Automatizovaný trading bot pro Bitcoin s pokročilými algoritmy.',
      features: ['Auto-Trading', 'AI Algoritmy', 'Risk Management'],
      mintPrice: 0.75,
      publicSaleDate: '2024-02-01',
    },
    {
      id: 'algo-trader',
      name: 'Algo Trader',
      symbol: 'ALGO',
      contractAddress: '0x9999...1111',
      totalMinted: 2890,
      maxSupply: 7500,
      floorPrice: 0.45,
      volume24h: 15.7,
      holders: 1456,
      royalties: 6.0,
      status: 'active',
      lastMint: '5 min ago',
      revenue: 130050,
      description: 'Algoritmické obchodování s využitím AI a machine learning.',
      features: ['Machine Learning', 'Multi-Exchange', 'Portfolio Balancing'],
      mintPrice: 0.40,
      publicSaleDate: '2024-03-15',
    },
    {
      id: 'vc-nft',
      name: 'VC NFT',
      symbol: 'VCN',
      contractAddress: '0x7777...3333',
      totalMinted: 774,
      maxSupply: 1500,
      floorPrice: 2.1,
      volume24h: 32.1,
      holders: 623,
      royalties: 10.0,
      status: 'presale',
      lastMint: '1 hour ago',
      revenue: 162540,
      description: 'Exkluzivní NFT kolekce s utility funkcemi a přístupem k investičním příležitostem.',
      features: ['Exclusive Access', 'DAO Voting', 'Premium Deals'],
      mintPrice: 2.0,
      publicSaleDate: '2024-04-01',
    },
  ];

  const handleProjectAction = (action: string, projectId: string) => {
    console.log(`Admin action: ${action} for project: ${projectId}`);
    // TODO: Implement actual actions
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        <PageHeader 
          title="NFT Projekty - Admin Správa"
          showBackButton={true}
        />

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EnhancedValueCard
            title="Celkem Projektů"
            value={nftProjects.length}
            formatter={(v) => String(v)}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20"
          />
          
          <EnhancedValueCard
            title="Celkem Minted"
            value={nftProjects.reduce((sum, p) => sum + p.totalMinted, 0)}
            formatter={(v) => v.toLocaleString()}
            className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20"
          />
          
          <EnhancedValueCard
            title="Celkem Holderů"
            value={nftProjects.reduce((sum, p) => sum + p.holders, 0)}
            formatter={(v) => v.toLocaleString()}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20"
          />
          
          <EnhancedValueCard
            title="Celkový Revenue"
            value={nftProjects.reduce((sum, p) => sum + p.revenue, 0)}
            formatter={(v) => `$${v.toLocaleString()}`}
            className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {nftProjects.map((project) => (
            <div key={project.id} className="bg-[#151515] rounded-xl border border-[#333333] p-6 hover:border-[#555555] transition-all duration-200">
              
              {/* Project Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#F9D523] to-[#e3c320] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#151515]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <p className="text-sm text-[#666666]">Symbol: {project.symbol}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {project.status === 'active' ? 'Aktivní' : 'Předprodej'}
                  </span>
                </div>
              </div>

              {/* Contract Address */}
              <div className="mb-4 p-3 bg-[#1a1a1a] rounded-lg">
                <p className="text-xs text-[#666666] mb-1">Contract Address:</p>
                <p className="text-sm font-mono text-white">{project.contractAddress}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#666666]">Minting Progress</span>
                  <span className="text-sm text-white">
                    {project.totalMinted.toLocaleString()} / {project.maxSupply.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#333333] rounded-full h-2">
                  <div 
                    className="bg-[#F9D523] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(project.totalMinted / project.maxSupply) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#666666] mt-1">
                  {((project.totalMinted / project.maxSupply) * 100).toFixed(1)}% dokončeno
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-3">
                  <p className="text-xs text-[#666666]">Floor Price</p>
                  <p className="text-lg font-bold text-white">{project.floorPrice} ETH</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-3">
                  <p className="text-xs text-[#666666]">24h Volume</p>
                  <p className="text-lg font-bold text-white">{project.volume24h} ETH</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-3">
                  <p className="text-xs text-[#666666]">Holders</p>
                  <p className="text-lg font-bold text-white">{project.holders.toLocaleString()}</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-3">
                  <p className="text-xs text-[#666666]">Royalties</p>
                  <p className="text-lg font-bold text-white">{project.royalties}%</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <p className="text-xs text-[#666666] mb-2">Features:</p>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-[#333333] text-white text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Additional Info */}
              <div className="text-xs text-[#666666] mb-4 space-y-1">
                <p>Mint Price: {project.mintPrice} ETH</p>
                <p>Public Sale: {formatDate(project.publicSaleDate)}</p>
                <p>Last Mint: {project.lastMint}</p>
                <p>Total Revenue: ${project.revenue.toLocaleString()}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-[#333333]">
                <button 
                  onClick={() => handleProjectAction('manage', project.id)}
                  className="flex-1 bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] px-4 py-2 rounded-lg font-medium transition-colors text-center"
                >
                  Manage Project
                </button>
                <button 
                  onClick={() => handleProjectAction('pause', project.id)}
                  className="flex-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-4 py-2 rounded-lg font-medium transition-colors border border-orange-500/30"
                >
                  {project.status === 'active' ? 'Pause' : 'Resume'}
                </button>
                <button 
                  onClick={() => handleProjectAction('analytics', project.id)}
                  className="flex-1 bg-[#333333] hover:bg-[#444444] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Analytics
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Rychlé Admin Akce</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => handleProjectAction('create', 'new')}
              className="p-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg border border-green-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-sm font-medium">Nový Projekt</p>
            </button>
            
            <button 
              onClick={() => handleProjectAction('batch-mint', 'all')}
              className="p-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">Batch Mint</p>
            </button>
            
            <button 
              onClick={() => handleProjectAction('update-metadata', 'all')}
              className="p-4 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg border border-purple-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-sm font-medium">Update Metadata</p>
            </button>
            
            <button 
              onClick={() => handleProjectAction('emergency-stop', 'all')}
              className="p-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm font-medium">Emergency Stop</p>
            </button>
          </div>
        </div>
      </Stack>
    </Container>
  );
}
