'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DashboardButton } from '@/components/dashboard';
import { nftService, NFTCollectionHistory } from '@/services/nft.service';

export interface HistoryManagementProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  onHistoryUpdated?: () => void;
}

interface EditingHistory {
  id: string;
  totalValueUSD: number;
  reason: string;
  changeType: string;
}

export default function HistoryManagement({
  isOpen,
  onClose,
  projectId,
  projectName,
  onHistoryUpdated
}: HistoryManagementProps) {
  const [history, setHistory] = useState<NFTCollectionHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState<EditingHistory | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get collection ID by symbol (projectId is symbol.toLowerCase())
      const collectionsResponse = await nftService.getCollections();
      if (!collectionsResponse.success || !collectionsResponse.data) {
        throw new Error('Failed to load collections');
      }
      
      const collection = collectionsResponse.data.find(
        c => c.symbol.toLowerCase() === projectId.toLowerCase()
      );
      
      if (!collection) {
        throw new Error('Collection not found');
      }

      // Get history for this collection
      const historyResponse = await nftService.getCollectionHistory(collection._id, 90); // Last 90 days
      if (historyResponse.success && historyResponse.data) {
        setHistory(historyResponse.data.history);
      }
    } catch (err: unknown) {
      console.error('Failed to load history:', err);
      setError(err instanceof Error ? err.message : 'Failed to load history');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // Load history when modal opens
  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen, loadHistory]);

  const handleDeleteRecord = async (historyId: string) => {
    if (!confirm('Are you sure you want to delete this history record?')) {
      return;
    }

    try {
      // Get collection ID
      const collectionsResponse = await nftService.getCollections();
      if (!collectionsResponse.success || !collectionsResponse.data) {
        throw new Error('Failed to load collections');
      }
      
      const collection = collectionsResponse.data.find(
        c => c.symbol.toLowerCase() === projectId.toLowerCase()
      );
      
      if (!collection) {
        throw new Error('Collection not found');
      }

      const result = await nftService.deleteHistoryRecord(collection._id, historyId);
      if (result.success) {
        await loadHistory(); // Reload history
        onHistoryUpdated?.();
      } else {
        setError(result.error || 'Failed to delete record');
      }
    } catch (err: unknown) {
      console.error('Failed to delete history record:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete record');
    }
  };

  const handleEditRecord = (record: NFTCollectionHistory) => {
    setEditingRecord({
      id: record._id,
      totalValueUSD: record.totalValueUSD,
      reason: record.reason,
      changeType: record.changeType
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingRecord) return;

    try {
      // Get collection ID
      const collectionsResponse = await nftService.getCollections();
      if (!collectionsResponse.success || !collectionsResponse.data) {
        throw new Error('Failed to load collections');
      }
      
      const collection = collectionsResponse.data.find(
        c => c.symbol.toLowerCase() === projectId.toLowerCase()
      );
      
      if (!collection) {
        throw new Error('Collection not found');
      }

      const result = await nftService.updateHistoryRecord(
        collection._id,
        editingRecord.id,
        {
          totalValueUSD: editingRecord.totalValueUSD,
          reason: editingRecord.reason,
          changeType: editingRecord.changeType as 'manual_update' | 'automatic_sync' | 'admin_correction' | 'initial_value'
        }
      );

      if (result.success) {
        setIsEditModalOpen(false);
        setEditingRecord(null);
        await loadHistory(); // Reload history
        onHistoryUpdated?.();
      } else {
        setError(result.error || 'Failed to update record');
      }
    } catch (err: unknown) {
      console.error('Failed to update history record:', err);
      setError(err instanceof Error ? err.message : 'Failed to update record');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('cs-CZ');
  };

  const getChangeTypeLabel = (changeType: string) => {
    switch (changeType) {
      case 'manual_update': return 'Manuální update';
      case 'automatic_sync': return 'Automatická synchronizace';
      case 'admin_correction': return 'Admin korekce';
      case 'initial_value': return 'Počáteční hodnota';
      default: return changeType;
    }
  };

  const getChangeTypeColor = (changeType: string) => {
    switch (changeType) {
      case 'manual_update': return 'text-blue-400';
      case 'automatic_sync': return 'text-green-400';
      case 'admin_correction': return 'text-yellow-400';
      case 'initial_value': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main History Modal */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1a1a1a] rounded-lg border border-[#333333] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-[#333333]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Historie změn: {projectName}
              </h2>
              <button
                onClick={onClose}
                className="text-[#666666] hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F9D523]"></div>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#666666]">Žádná historie změn nebyla nalezena.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((record) => (
                  <div
                    key={record._id}
                    className="bg-[#2a2a2a] rounded-lg border border-[#333333] p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-[#666666]">Celková hodnota USD</p>
                            <p className="text-lg font-semibold text-white">
                              ${record.totalValueUSD.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#666666]">Cena za kartu</p>
                            <p className="text-lg font-semibold text-white">
                              ${record.pricePerCard.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#666666]">Typ změny</p>
                            <p className={`text-sm font-medium ${getChangeTypeColor(record.changeType)}`}>
                              {getChangeTypeLabel(record.changeType)}
                            </p>
                          </div>
                        </div>
                        
                        {record.reason && (
                          <div className="mb-3">
                            <p className="text-xs text-[#666666]">Důvod</p>
                            <p className="text-sm text-white">{record.reason}</p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#666666]">
                          <div>
                            <span>Datum: {formatDate(record.timestamp)}</span>
                          </div>
                          <div>
                            <span>Upravil: {record.updatedBy || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <DashboardButton
                          onClick={() => handleEditRecord(record)}
                          variant="outline"
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 px-3 py-1 text-xs"
                        >
                          Edit
                        </DashboardButton>
                        <DashboardButton
                          onClick={() => handleDeleteRecord(record._id)}
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/20 px-3 py-1 text-xs"
                        >
                          Delete
                        </DashboardButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit History Record Modal */}
      {isEditModalOpen && editingRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#333333] max-w-md w-full">
            <div className="p-6 border-b border-[#333333]">
              <h3 className="text-lg font-bold text-white">Editovat historický záznam</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">
                  Celková hodnota USD
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingRecord.totalValueUSD}
                  onChange={(e) => setEditingRecord(prev => prev ? {
                    ...prev,
                    totalValueUSD: parseFloat(e.target.value) || 0
                  } : null)}
                  className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">
                  Důvod
                </label>
                <textarea
                  value={editingRecord.reason}
                  onChange={(e) => setEditingRecord(prev => prev ? {
                    ...prev,
                    reason: e.target.value
                  } : null)}
                  rows={3}
                  className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-2">
                  Typ změny
                </label>
                <select
                  value={editingRecord.changeType}
                  onChange={(e) => setEditingRecord(prev => prev ? {
                    ...prev,
                    changeType: e.target.value
                  } : null)}
                  className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
                >
                  <option value="manual_update">Manuální update</option>
                  <option value="automatic_sync">Automatická synchronizace</option>
                  <option value="admin_correction">Admin korekce</option>
                  <option value="initial_value">Počáteční hodnota</option>
                </select>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#333333] flex justify-end gap-3">
              <DashboardButton
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingRecord(null);
                }}
                variant="outline"
                className="border-[#666666] text-[#666666] hover:bg-[#444444]"
              >
                Cancel
              </DashboardButton>
              <DashboardButton
                onClick={handleSaveEdit}
                variant="primary"
                className="bg-[#F9D523] hover:bg-[#e3c320] text-[#151515]"
              >
                Save Changes
              </DashboardButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
