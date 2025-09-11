'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DashboardButton } from '@/components/dashboard';
import { NFTProject, nftService, NFTCollectionHistory } from '@/services/nft.service';

export interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: NFTProject | null;
  onSave: (projectId: string, data: Record<string, unknown>) => Promise<void>;
  loading?: boolean;
}

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
  onSave,
  loading = false
}: EditProjectModalProps) {
  const [formData, setFormData] = useState({
    collectionName: '',
    symbol: '',
    totalValueUSD: 0,
    cardCount: 0,
    floorPrice: 0,
    volume24h: 0,
    mintPrice: 0,
    royalties: 0,
    description: '',
    features: [] as string[],
    status: 'active' as 'active' | 'presale' | 'paused'
  });

  const [newFeature, setNewFeature] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // History tab state
  const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');
  const [history, setHistory] = useState<NFTCollectionHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);
  const [historyEditData, setHistoryEditData] = useState<{
    totalValueUSD: number;
    reason: string;
    changeType: 'manual_update' | 'automatic_sync' | 'admin_correction' | 'initial_value';
  }>({ totalValueUSD: 0, reason: '', changeType: 'manual_update' });

  // Load history callback - defined before useEffect that uses it
  const loadHistory = useCallback(async () => {
    if (!project?.id) return;
    
    try {
      setHistoryLoading(true);
      // We need to find the collection by symbol to get its MongoDB _id
      const collectionsResponse = await nftService.getCollections();
      if (collectionsResponse.success && collectionsResponse.data) {
        const collection = collectionsResponse.data.find(c => c.symbol.toLowerCase() === project.id.toLowerCase());
        if (collection) {
          const historyResponse = await nftService.getCollectionHistory(collection._id, 30);
          if (historyResponse.success && historyResponse.data) {
            setHistory(historyResponse.data.history);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setHistoryLoading(false);
    }
  }, [project?.id]);
  
  // Reset form when project changes
  useEffect(() => {
    if (project) {
      setFormData({
        collectionName: project.name,
        symbol: project.symbol,
        totalValueUSD: project.totalValueUSD || 0,
        cardCount: project.cardCount || 0,
        floorPrice: project.floorPrice,
        volume24h: project.volume24h,
        mintPrice: project.mintPrice,
        royalties: project.royalties,
        description: project.description,
        features: [...project.features],
        status: project.status
      });
      setErrors({});
      
      // Reset tab state
      setActiveTab('details');
      setHistory([]);
      setEditingHistoryId(null);
    }
  }, [project]);
  
  // Load history when history tab is active
  useEffect(() => {
    if (activeTab === 'history' && project && project.id) {
      loadHistory();
    }
  }, [activeTab, project, loadHistory]);
  
  const handleDeleteHistory = async (historyId: string) => {
    if (!project?.id || !window.confirm('Opravdu chcete smazat tento záznam historie?')) return;
    
    try {
      const collectionsResponse = await nftService.getCollections();
      if (collectionsResponse.success && collectionsResponse.data) {
        const collection = collectionsResponse.data.find(c => c.symbol.toLowerCase() === project.id.toLowerCase());
        if (collection) {
          const result = await nftService.deleteHistoryRecord(collection._id, historyId);
          if (result.success) {
            await loadHistory(); // Reload history
          } else {
            alert('Chyba při mazání záznamu: ' + result.error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to delete history record:', error);
      alert('Chyba při mazání záznamu');
    }
  };
  
  const handleEditHistory = (historyRecord: NFTCollectionHistory) => {
    setEditingHistoryId(historyRecord._id);
    setHistoryEditData({
      totalValueUSD: historyRecord.totalValueUSD,
      reason: historyRecord.reason,
      changeType: historyRecord.changeType
    });
  };
  
  const handleSaveHistoryEdit = async () => {
    if (!project?.id || !editingHistoryId) return;
    
    try {
      const collectionsResponse = await nftService.getCollections();
      if (collectionsResponse.success && collectionsResponse.data) {
        const collection = collectionsResponse.data.find(c => c.symbol.toLowerCase() === project.id.toLowerCase());
        if (collection) {
          const result = await nftService.updateHistoryRecord(collection._id, editingHistoryId, historyEditData);
          if (result.success) {
            setEditingHistoryId(null);
            await loadHistory(); // Reload history
          } else {
            alert('Chyba při ukládání: ' + result.error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to save history edit:', error);
      alert('Chyba při ukládání změn');
    }
  };
  
  const handleCancelHistoryEdit = () => {
    setEditingHistoryId(null);
    setHistoryEditData({ totalValueUSD: 0, reason: '', changeType: 'manual_update' });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.collectionName.trim()) {
      newErrors.collectionName = 'Collection name is required';
    }
    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required';
    }
    if (formData.totalValueUSD < 0) {
      newErrors.totalValueUSD = 'Total value must be positive';
    }
    if (formData.cardCount < 1) {
      newErrors.cardCount = 'Card count must be at least 1';
    }
    if (formData.royalties < 0 || formData.royalties > 100) {
      newErrors.royalties = 'Royalties must be between 0-100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!project || !validateForm()) {
      return;
    }

    try {
      await onSave(project.id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg border border-[#333333] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#333333]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              Edit Project: {project.name}
            </h2>
            <button
              onClick={handleClose}
              disabled={loading}
              className="text-[#666666] hover:text-white transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-1 mt-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'details'
                  ? 'bg-[#F9D523] text-[#151515]'
                  : 'text-[#666666] hover:text-white hover:bg-[#2a2a2a]'
              }`}
              disabled={loading}
            >
              Detaily projektu
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-[#F9D523] text-[#151515]'
                  : 'text-[#666666] hover:text-white hover:bg-[#2a2a2a]'
              }`}
              disabled={loading}
            >
              Historie hodnot
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                Collection Name *
              </label>
              <input
                type="text"
                value={formData.collectionName}
                onChange={(e) => handleInputChange('collectionName', e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              />
              {errors.collectionName && (
                <p className="text-red-400 text-xs mt-1">{errors.collectionName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                Symbol *
              </label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              />
              {errors.symbol && (
                <p className="text-red-400 text-xs mt-1">{errors.symbol}</p>
              )}
            </div>
          </div>

          {/* Financial Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                Total Value USD *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.totalValueUSD}
                onChange={(e) => handleInputChange('totalValueUSD', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              />
              {errors.totalValueUSD && (
                <p className="text-red-400 text-xs mt-1">{errors.totalValueUSD}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                Card Count *
              </label>
              <input
                type="number"
                min="1"
                value={formData.cardCount}
                onChange={(e) => handleInputChange('cardCount', parseInt(e.target.value) || 0)}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              />
              {errors.cardCount && (
                <p className="text-red-400 text-xs mt-1">{errors.cardCount}</p>
              )}
            </div>
          </div>

          {/* Trading Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                Floor Price (ETH)
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={formData.floorPrice}
                onChange={(e) => handleInputChange('floorPrice', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                24h Volume (ETH)
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={formData.volume24h}
                onChange={(e) => handleInputChange('volume24h', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                Mint Price (ETH)
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={formData.mintPrice}
                onChange={(e) => handleInputChange('mintPrice', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Status and Royalties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              >
                <option value="active">Aktivní</option>
                <option value="presale">Předprodej</option>
                <option value="paused">Pozastaveno</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                Royalties (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.royalties}
                onChange={(e) => handleInputChange('royalties', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                disabled={loading}
              />
              {errors.royalties && (
                <p className="text-red-400 text-xs mt-1">{errors.royalties}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#666666] mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none resize-none"
              disabled={loading}
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-[#666666] mb-2">
              Features
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Add feature..."
                  className="flex-1 bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                  disabled={loading}
                />
                <DashboardButton
                  type="button"
                  onClick={addFeature}
                  variant="outline"
                  className="border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523]/20"
                  disabled={loading || !newFeature.trim()}
                >
                  Add
                </DashboardButton>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#F9D523]/20 text-[#F9D523] rounded-full text-xs"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      disabled={loading}
                      className="text-[#F9D523] hover:text-white transition-colors disabled:opacity-50"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#333333]">
            <DashboardButton
              type="button"
              onClick={handleClose}
              variant="outline"
              className="border-[#666666] text-[#666666] hover:bg-[#444444] hover:border-[#444444]"
              disabled={loading}
            >
              Cancel
            </DashboardButton>
            <DashboardButton
              type="submit"
              variant="primary"
              className="bg-[#F9D523] hover:bg-[#e3c320] text-[#151515]"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </DashboardButton>
          </div>
          </form>
        )}
        
        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="p-6 space-y-6">
            {historyLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F9D523]"></div>
                <span className="ml-3 text-[#666666]">Načítání historie...</span>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#666666]">Žádná historie hodnot nebyla nalezena.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Historie změn hodnot ({history.length} záznamů)
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {history.map((record) => (
                    <div key={record._id} className="bg-[#2a2a2a] rounded-lg p-4 border border-[#333333]">
                      {editingHistoryId === record._id ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-[#666666] mb-1">Celková hodnota USD</label>
                              <input
                                type="number"
                                step="0.01"
                                value={historyEditData.totalValueUSD}
                                onChange={(e) => setHistoryEditData(prev => ({
                                  ...prev,
                                  totalValueUSD: parseFloat(e.target.value) || 0
                                }))}
                                className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-2 py-1 text-white text-sm focus:border-[#F9D523] focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-[#666666] mb-1">Typ změny</label>
                              <select
                                value={historyEditData.changeType}
                                onChange={(e) => setHistoryEditData(prev => ({
                                  ...prev,
                                  changeType: e.target.value as 'manual_update' | 'automatic_sync' | 'admin_correction' | 'initial_value'
                                }))}
                                className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-2 py-1 text-white text-sm focus:border-[#F9D523] focus:outline-none"
                              >
                                <option value="manual_update">Manuální update</option>
                                <option value="admin_correction">Admin korekce</option>
                                <option value="automatic_sync">Automatická synchronizace</option>
                                <option value="initial_value">Počáteční hodnota</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-[#666666] mb-1">Důvod změny</label>
                            <input
                              type="text"
                              value={historyEditData.reason}
                              onChange={(e) => setHistoryEditData(prev => ({
                                ...prev,
                                reason: e.target.value
                              }))}
                              className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-2 py-1 text-white text-sm focus:border-[#F9D523] focus:outline-none"
                              placeholder="Důvod změny..."
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <DashboardButton
                              type="button"
                              onClick={handleSaveHistoryEdit}
                              variant="primary"
                              className="bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] text-xs px-3 py-1"
                            >
                              Uložit
                            </DashboardButton>
                            <DashboardButton
                              type="button"
                              onClick={handleCancelHistoryEdit}
                              variant="outline"
                              className="border-[#666666] text-[#666666] hover:bg-[#444444] text-xs px-3 py-1"
                            >
                              Zrušit
                            </DashboardButton>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-white font-medium">
                                ${record.totalValueUSD.toLocaleString()}
                              </h4>
                              <p className="text-sm text-[#666666]">
                                ${record.pricePerCard.toFixed(6)} per card
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-[#666666]">
                                {new Date(record.timestamp).toLocaleDateString('cs-CZ', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {record.valueChange && (
                                <p className={`text-xs font-medium ${
                                  record.valueChange > 0 ? 'text-green-400' : record.valueChange < 0 ? 'text-red-400' : 'text-[#666666]'
                                }`}>
                                  {record.valueChange > 0 ? '+' : ''}${record.valueChange.toLocaleString()}
                                  {record.percentageChange && (
                                    <span className="ml-1">({record.percentageChange > 0 ? '+' : ''}{record.percentageChange.toFixed(2)}%)</span>
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm text-[#666666] mb-1">Důvod:</p>
                            <p className="text-white text-sm">{record.reason}</p>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                record.changeType === 'manual_update' ? 'bg-blue-500/20 text-blue-400' :
                                record.changeType === 'admin_correction' ? 'bg-yellow-500/20 text-yellow-400' :
                                record.changeType === 'automatic_sync' ? 'bg-green-500/20 text-green-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {record.changeType === 'manual_update' ? 'Manuální' :
                                 record.changeType === 'admin_correction' ? 'Korekce' :
                                 record.changeType === 'automatic_sync' ? 'Auto sync' : 'Počáteční'}
                              </span>
                              {record.updatedBy && (
                                <span className="text-xs text-[#666666]">by {record.updatedBy}</span>
                              )}
                            </div>
                            
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => handleEditHistory(record)}
                                className="text-blue-400 hover:text-blue-300 p-1"
                                title="Editovat"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteHistory(record._id)}
                                className="text-red-400 hover:text-red-300 p-1"
                                title="Smazat"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Close button for history tab */}
            <div className="flex justify-end pt-4 border-t border-[#333333]">
              <DashboardButton
                type="button"
                onClick={handleClose}
                variant="outline"
                className="border-[#666666] text-[#666666] hover:bg-[#444444] hover:border-[#444444]"
                disabled={loading}
              >
                Zavřít
              </DashboardButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
