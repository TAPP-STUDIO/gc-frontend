'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { useMarketplace } from '@/hook/useMarketplace';
import { marketplaceService } from '@/services/marketplace.service';
import { DashboardButton } from '@/components/dashboard';
import { Loader2 } from 'lucide-react';

interface NFT {
  id: string;
  tokenId: number;
  type: string;
  subtype?: string;
  premium?: boolean;
  attributes?: Record<string, unknown>;
}

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userNFTs?: NFT[];
}

export function CreateListingModal({ isOpen, onClose, userNFTs = [] }: CreateListingModalProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const { refresh } = useMarketplace();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedNFT || !price || !description) {
      error('Chybné údaje', 'Prosím vyplňte všechna povinná pole');
      return;
    }

    setLoading(true);
    
    try {
      const listingData = {
        tokenId: selectedNFT.tokenId,
        type: selectedNFT.type,
        subtype: selectedNFT.subtype,
        price: parseFloat(price),
        description,
        premium: selectedNFT.premium || false,
        attributes: selectedNFT.attributes
      };

      const response = await marketplaceService.createListing(listingData);
      
      if (response.success) {
        success('Nabídka vytvořena', 'Vaše NFT bylo úspěšně zařazeno na marketplace');
        refresh();
        onClose();
        resetForm();
      } else {
        error('Chyba při vytváření', response.error || 'Nepodařilo se vytvořit nabídku');
      }
    } catch {
      error('Chyba', 'Nastala neočekávaná chyba');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedNFT(null);
    setPrice('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Vytvořit nabídku na marketplace"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* NFT Selection */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Vyberte NFT *
          </label>
          {userNFTs.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <p>Nemáte žádné NFT k prodeji</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {userNFTs.map((nft) => (
                <div
                  key={nft.id}
                  onClick={() => setSelectedNFT(nft)}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${selectedNFT?.id === nft.id 
                      ? 'border-[#F9D523] bg-[#F9D523]/10' 
                      : 'border-white/20 hover:border-white/40'
                    }
                  `}
                >
                  <div className="text-sm font-medium text-white">
                    {nft.type} #{nft.tokenId}
                  </div>
                  {nft.subtype && (
                    <div className="text-xs text-white/60">{nft.subtype}</div>
                  )}
                  {nft.premium && (
                    <div className="inline-block px-2 py-1 mt-1 text-xs bg-[#F9D523] text-black rounded">
                      Premium
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-white mb-2">
            Cena (USD) *
          </label>
          <div className="relative">
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
              step="0.01"
              className="input-glass w-full pl-8"
              placeholder="0.00"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
              $
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
            Popis *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-glass w-full h-24 resize-none"
            placeholder="Popište vaše NFT a proč by si ho měli kupci vybrat..."
            required
          />
        </div>

        {/* Selected NFT Preview */}
        {selectedNFT && (
          <div className="glass-card p-4">
            <h4 className="text-white font-medium mb-2">Náhled nabídky</h4>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white">{selectedNFT.type} #{selectedNFT.tokenId}</div>
                {selectedNFT.subtype && (
                  <div className="text-sm text-white/60">{selectedNFT.subtype}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-[#F9D523] font-bold">${price || '0.00'}</div>
                <div className="text-xs text-white/60">Cena</div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-white/70 hover:text-white transition-colors"
            disabled={loading}
          >
            Zrušit
          </button>
          <DashboardButton
            type="submit"
            variant="primary"
            disabled={loading || !selectedNFT || !price || !description}
            className="px-6 py-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Vytváření...
              </>
            ) : (
              'Vytvořit nabídku'
            )}
          </DashboardButton>
        </div>
      </form>
    </Modal>
  );
}

interface Listing {
  id: string;
  tokenId: number;
  type: string;
  subtype?: string;
  price: number;
}

interface MakeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing | null;
}

export function MakeOfferModal({ isOpen, onClose, listing }: MakeOfferModalProps) {
  const [offerPrice, setOfferPrice] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!listing) {
      error('Chyba', 'Nabídka není k dispozici');
      return;
    }
    
    if (!offerPrice) {
      error('Chybná cena', 'Prosím zadejte nabízenou cenu');
      return;
    }

    const price = parseFloat(offerPrice);
    if (price <= 0) {
      error('Neplatná cena', 'Cena musí být větší než 0');
      return;
    }

    if (price >= listing.price) {
      error('Vysoká cena', 'Nabídka nemůže být vyšší nebo rovna prodejní ceně');
      return;
    }

    setLoading(true);
    
    try {
      const response = await marketplaceService.makeOffer({
        listingId: listing.id,
        price,
        message
      });
      
      if (response.success) {
        success('Nabídka odeslána', 'Vaša nabídka byla úspěšně odeslána prodejci');
        onClose();
        resetForm();
      } else {
        error('Chyba při odesílání', response.error || 'Nepodařilo se odeslat nabídku');
      }
    } catch {
      error('Chyba', 'Nastala neočekávaná chyba');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setOfferPrice('');
    setMessage('');
  };

  if (!listing) return null;

  const maxOffer = listing.price * 0.9; // Max 90% of listing price

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Učinit nabídku"
      size="md"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Listing Info */}
        <div className="glass-card p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-white font-medium">
                {listing.type} #{listing.tokenId}
              </div>
              {listing.subtype && (
                <div className="text-sm text-white/60">{listing.subtype}</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-[#F9D523] font-bold">${listing.price}</div>
              <div className="text-xs text-white/60">Prodejní cena</div>
            </div>
          </div>
        </div>

        {/* Offer Price */}
        <div>
          <label htmlFor="offerPrice" className="block text-sm font-medium text-white mb-2">
            Vaše nabídka (USD) *
          </label>
          <div className="relative">
            <input
              type="number"
              id="offerPrice"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              min="1"
              max={maxOffer}
              step="0.01"
              className="input-glass w-full pl-8"
              placeholder="0.00"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
              $
            </span>
          </div>
          <div className="mt-1 text-xs text-white/60">
            Maximální nabídka: ${maxOffer.toFixed(2)}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
            Zpráva (volitelné)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-glass w-full h-20 resize-none"
            placeholder="Napište zprávu prodejci..."
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-white/70 hover:text-white transition-colors"
            disabled={loading}
          >
            Zrušit
          </button>
          <DashboardButton
            type="submit"
            variant="primary"
            disabled={loading || !offerPrice}
            className="px-6 py-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Odesílání...
              </>
            ) : (
              'Odeslat nabídku'
            )}
          </DashboardButton>
        </div>
      </form>
    </Modal>
  );
}
