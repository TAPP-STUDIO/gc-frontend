'use client';

import React, { useState, useEffect } from 'react';
import { DashboardCard, StatCard, DashboardButton } from '@/components/dashboard';
import { nftService, NFTProjectsResponse, NFTProject, NFTHealthCheck } from '@/services/nft.service';
import EditProjectModal from '@/components/modals/EditProjectModal';

export default function NFTsAdminPage() {
  const [projectsData, setProjectsData] = useState<NFTProjectsResponse | null>(null);
  const [healthCheck, setHealthCheck] = useState<NFTHealthCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [editingProject, setEditingProject] = useState<NFTProject | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  // Load initial data only once
  useEffect(() => {
    loadData();
  }, []); // Fixed: removed dependency array issues

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load projects first (contains most important data)
      const projectsResponse = await nftService.getProjects();
      
      // Only load health check if projects succeed
      let healthResponse = null;
      if (projectsResponse.success) {
        try {
          healthResponse = await nftService.healthCheck();
        } catch (healthError) {
          console.warn('Health check failed, continuing without it:', healthError);
        }
      }

      if (projectsResponse.success && projectsResponse.data) {
        setProjectsData(projectsResponse.data);
      } else {
        setError(projectsResponse.error || 'Failed to load NFT projects');
      }

      if (healthResponse?.success && healthResponse.data) {
        setHealthCheck(healthResponse.data);
      }

    } catch (err: any) {
      console.error('Failed to load NFT data:', err);
      setError(err.message || 'Failed to load NFT data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleSaveProject = async (projectId: string, data: any) => {
    try {
      setModalLoading(true);
      const result = await nftService.updateProject(projectId, data);
      
      if (result.success) {
        // Refresh data to show updated values
        await loadData();
        setIsEditModalOpen(false);
        setEditingProject(null);
      } else {
        throw new Error(result.error || 'Failed to update project');
      }
    } catch (error: any) {
      console.error('Failed to save project:', error);
      setError(error.message || 'Failed to save project changes');
      throw error; // Re-throw to let modal handle it
    } finally {
      setModalLoading(false);
    }
  };

  const handleProjectAction = async (action: string, projectId?: string) => {
    console.log(`Admin action: ${action} for project: ${projectId}`);
    
    switch (action) {
      case 'manage':
        // Find the project and open edit modal
        const project = projectsData?.projects.find(p => p.id === projectId);
        if (project) {
          setEditingProject(project);
          setIsEditModalOpen(true);
        } else {
          setError(`Project ${projectId} not found`);
        }
        break;
      case 'mint':
        // TODO: Open mint dialog for specific project
        alert(`Mint NFT for project ${projectId} - coming soon...`);
        break;
      case 'pause':
        // TODO: Pause/resume project
        alert(`Pause/Resume project ${projectId} - coming soon...`);
        break;
      case 'analytics':
        // TODO: Show project analytics
        alert(`Analytics for project ${projectId} - coming soon...`);
        break;
      case 'global-mint':
        // TODO: Open global mint dialog
        alert('Global mint dialog coming soon...');
        break;
      case 'distribute':
        // TODO: Open distribution dialog
        alert('Distribution dialog coming soon...');
        break;
      case 'health-check':
        await handleRefresh();
        break;
      default:
        alert(`Action ${action} not implemented yet`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  const getCardTypeColor = (cardType: number): string => {
    switch (cardType) {
      case 0: return 'from-yellow-500 to-yellow-600'; // GC
      case 1: return 'from-blue-500 to-blue-600';     // ETH
      case 2: return 'from-orange-500 to-orange-600'; // BTC
      case 3: return 'from-purple-500 to-purple-600'; // VC NFT
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <DashboardCard variant="highlighted">
          <h1 className="text-3xl font-bold text-white mb-2">NFT Projekty - Načítání...</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F9D523]"></div>
          </div>
        </DashboardCard>
      </div>
    );
  }

  if (error && !projectsData) {
    return (
      <div className="p-6 lg:p-8">
        <DashboardCard variant="highlighted">
          <h1 className="text-3xl font-bold text-white mb-2">NFT Projekty - Chyba</h1>
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 mt-4">
            <h3 className="text-red-400 font-semibold mb-2">Chyba při načítání dat</h3>
            <p className="text-red-300 mb-4">{error}</p>
            <DashboardButton 
              onClick={handleRefresh}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              Zkusit znovu
            </DashboardButton>
          </div>
        </DashboardCard>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header with refresh button */}
      <DashboardCard 
        variant="highlighted" 
        className="mb-6 border-[#F9D523]/20 bg-gradient-to-br from-[#F9D523]/5 to-transparent"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">NFT Projekty - Admin Správa</h1>
            <p className="text-white/60 text-sm">Správa všech NFT projektů s live daty ze smart contracts</p>
          </div>
          <DashboardButton
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="border-[#F9D523]/30 text-[#F9D523] hover:bg-[#F9D523]/20 hover:border-[#F9D523] disabled:opacity-50"
          >
            <svg className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {refreshing ? 'Načítání...' : 'Obnovit'}
          </DashboardButton>
        </div>
      </DashboardCard>

      {/* Error banner */}
      {error && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-300">
            <strong>Varování:</strong> {error}
          </p>
        </div>
      )}

      {/* Health Status */}
      {healthCheck && (
        <DashboardCard variant="default" className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Stav Blockchain Připojení</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <p className="text-xs text-[#666666] mb-1">Block číslo</p>
              <p className="text-white font-semibold">{healthCheck.details?.blockNumber.toLocaleString()}</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <p className="text-xs text-[#666666] mb-1">Admin Wallet</p>
              <p className="text-white font-semibold">{parseFloat(healthCheck.details?.walletBalance || '0').toFixed(4)} ETH</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <p className="text-xs text-[#666666] mb-1">Wallet Address</p>
              <p className="text-white font-mono text-xs">{healthCheck.details?.walletAddress.slice(0, 10)}...</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <p className="text-xs text-[#666666] mb-1">Stav</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </span>
            </div>
          </div>
        </DashboardCard>
      )}

      {/* Overview Stats */}
      {projectsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Celkem Projektů"
            value={projectsData.overview.totalProjects.toString()}
            trend={{ value: 0, isPositive: true }}
          />
          
          <StatCard
            title="Celkem NFTs"
            value={projectsData.overview.totalNFTs?.toLocaleString() || '0'}
            trend={{ value: 0, isPositive: true }}
          />
          
          <StatCard
            title="Aktivní Projekty"
            value={projectsData.overview.activeProjects.toString()}
            trend={{ value: 0, isPositive: true }}
          />
          
          <StatCard
            title="Celkový Revenue"
            value={`$${projectsData.overview.totalRevenue.toLocaleString()}`}
            trend={{ value: 0, isPositive: true }}
          />
        </div>
      )}

      {/* Projects Grid */}
      {projectsData && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {projectsData.projects.map((project) => (
            <DashboardCard key={project.id} variant="default" className="hover:border-[#555555] transition-all duration-200">
              
              {/* Project Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getCardTypeColor(project.cardType)} rounded-lg flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      : project.status === 'presale'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {project.status === 'active' ? 'Aktivní' : project.status === 'presale' ? 'Předprodej' : 'Pozastaveno'}
                  </span>
                </div>
              </div>

              {/* Contract Address */}
              <div className="mb-4 p-3 bg-[#1a1a1a] rounded-lg">
                <p className="text-xs text-[#666666] mb-1">Contract Address:</p>
                <p className="text-sm font-mono text-white">{project.contractAddress.slice(0, 20)}...{project.contractAddress.slice(-8)}</p>
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
                    className={`bg-gradient-to-r ${getCardTypeColor(project.cardType)} h-2 rounded-full transition-all duration-300`}
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
                <DashboardButton 
                  onClick={() => handleProjectAction('manage', project.id)}
                  variant="primary"
                  className="flex-1 bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] border-[#F9D523]"
                >
                  Manage Project
                </DashboardButton>
                <DashboardButton 
                  onClick={() => handleProjectAction('mint', project.id)}
                  variant="outline"
                  className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500"
                >
                  Mint NFT
                </DashboardButton>
                <DashboardButton 
                  onClick={() => handleProjectAction('analytics', project.id)}
                  variant="outline"
                  className="flex-1 border-[#666666] text-[#666666] hover:bg-[#444444] hover:border-[#444444] hover:text-white"
                >
                  Analytics
                </DashboardButton>
              </div>
            </DashboardCard>
          ))}
        </div>
      )}

      {/* Quick Global Actions */}
      <DashboardCard variant="default" className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Globální Admin Akce</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <DashboardButton 
            onClick={() => handleProjectAction('global-mint')}
            variant="outline"
            className="p-4 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">Global Mint</span>
          </DashboardButton>
          
          <DashboardButton 
            onClick={() => handleProjectAction('distribute')}
            variant="outline"
            className="p-4 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Distribute Dividends</span>
          </DashboardButton>
          
          <DashboardButton 
            onClick={() => handleProjectAction('health-check')}
            variant="outline"
            className="p-4 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Health Check</span>
          </DashboardButton>
          
          <DashboardButton 
            onClick={() => alert('Bulk operations coming soon...')}
            variant="outline"
            className="p-4 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-sm font-medium">Bulk Operations</span>
          </DashboardButton>
          
          <DashboardButton 
            onClick={() => alert('Emergency controls coming soon...')}
            variant="outline"
            className="p-4 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-sm font-medium">Emergency Stop</span>
          </DashboardButton>
        </div>
      </DashboardCard>

      {/* Current Distribution Info */}
      {projectsData?.overview.currentDistribution && (
        <DashboardCard variant="default" className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Aktuální Distribuce Dividend</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#666666] mb-2">Celková Částka</h4>
              <p className="text-2xl font-bold text-white">${parseFloat(projectsData.overview.currentDistribution.totalAmount).toLocaleString()}</p>
              <p className="text-xs text-[#666666] mt-1">USDT</p>
            </div>
            
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#666666] mb-2">Celkem NFTs</h4>
              <p className="text-2xl font-bold text-white">{projectsData.overview.currentDistribution.totalNFTs.toLocaleString()}</p>
              <p className="text-xs text-[#666666] mt-1">aktivních NFTs</p>
            </div>
            
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#666666] mb-2">Částka na NFT</h4>
              <p className="text-2xl font-bold text-white">${parseFloat(projectsData.overview.currentDistribution.perNFTAmount).toFixed(6)}</p>
              <p className="text-xs text-[#666666] mt-1">USDT per NFT</p>
            </div>
          </div>

          {projectsData.overview.currentDistribution.description && (
            <div className="mt-4 p-4 bg-[#2a2a2a] rounded-lg">
              <h4 className="text-sm font-medium text-[#666666] mb-2">Popis distribuce</h4>
              <p className="text-white">{projectsData.overview.currentDistribution.description}</p>
            </div>
          )}
        </DashboardCard>
      )}

      {/* Data timestamp */}
      {projectsData?.overview.lastUpdated && (
        <div className="text-center text-xs text-[#666666]">
          Posledně aktualizováno: {new Date(projectsData.overview.lastUpdated).toLocaleString('cs-CZ')}
        </div>
      )}

      {/* Edit Project Modal */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSave={handleSaveProject}
        loading={modalLoading}
      />
    </div>
  );
}
