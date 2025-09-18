'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DashboardCard,
  ValueCard,
  DashboardButton,
  InfoCard
} from '@/components/dashboard';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Download,
  Calendar,
  DollarSign,
  Hash,
  FileText,
  X
} from 'lucide-react';

// Dummy data pro transakce
const DUMMY_TRANSACTIONS = {
  'btc-gc': [
    {
      id: '1',
      type: 'buy',
      amount: 0.5,
      price: 28000,
      totalValue: 14000,
      date: '2024-01-15T10:30:00',
      note: 'První nákup BTC pro projekt',
      fee: 35
    },
    {
      id: '2',
      type: 'buy',
      amount: 1,
      price: 31000,
      totalValue: 31000,
      date: '2024-02-20T14:15:00',
      note: 'DCA strategie',
      fee: 77.50
    },
    {
      id: '3',
      type: 'buy',
      amount: 0.8,
      price: 35000,
      totalValue: 28000,
      date: '2024-03-10T09:45:00',
      note: 'Dokoupení při poklesu',
      fee: 70
    },
    {
      id: '4',
      type: 'sell',
      amount: 0.3,
      price: 38000,
      totalValue: 11400,
      date: '2024-04-05T16:20:00',
      note: 'Částečná realizace zisku',
      fee: 28.50
    },
    {
      id: '5',
      type: 'buy',
      amount: 0.5,
      price: 33000,
      totalValue: 16500,
      date: '2024-05-12T11:00:00',
      note: 'Nákup po korekci',
      fee: 41.25
    }
  ],
  'eth-gc': [
    {
      id: '1',
      type: 'buy',
      amount: 5,
      price: 1500,
      totalValue: 7500,
      date: '2024-01-10T08:00:00',
      note: 'První pozice ETH',
      fee: 18.75
    },
    {
      id: '2',
      type: 'buy',
      amount: 3,
      price: 1700,
      totalValue: 5100,
      date: '2024-02-01T12:30:00',
      note: 'Navýšení pozice',
      fee: 12.75
    },
    {
      id: '3',
      type: 'buy',
      amount: 4,
      price: 1900,
      totalValue: 7600,
      date: '2024-02-28T15:45:00',
      note: 'DCA',
      fee: 19
    },
    {
      id: '4',
      type: 'buy',
      amount: 3,
      price: 2100,
      totalValue: 6300,
      date: '2024-03-15T10:20:00',
      note: 'Poslední nákup',
      fee: 15.75
    }
  ]
};

// Typ pro transakci
interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  totalValue: number;
  date: string;
  note: string;
  fee: number;
}

// Modal pro přidání/editaci transakce
const TransactionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Partial<Transaction>) => void;
  transaction?: Transaction | null;
  cryptoSymbol: string;
}> = ({ isOpen, onClose, onSave, transaction, cryptoSymbol }) => {
  const [formData, setFormData] = useState({
    type: transaction?.type || 'buy',
    amount: transaction?.amount?.toString() || '',
    price: transaction?.price?.toString() || '',
    date: transaction?.date ? transaction.date.split('T')[0] : new Date().toISOString().split('T')[0],
    time: transaction?.date ? transaction.date.split('T')[1].substring(0, 5) : '12:00',
    note: transaction?.note || '',
    fee: transaction?.fee?.toString() || '0'
  });

  const totalValue = parseFloat(formData.amount || '0') * parseFloat(formData.price || '0');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      type: formData.type as 'buy' | 'sell',
      amount: parseFloat(formData.amount),
      price: parseFloat(formData.price),
      totalValue,
      date: `${formData.date}T${formData.time}:00`,
      note: formData.note,
      fee: parseFloat(formData.fee)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-white/10 rounded-lg w-full max-w-md">
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {transaction ? 'Upravit transakci' : 'Přidat transakci'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Typ transakce */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Typ transakce
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'buy' })}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.type === 'buy'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-white/5 text-white/60 border border-white/10'
                }`}
              >
                Nákup
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'sell' })}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  formData.type === 'sell'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : 'bg-white/5 text-white/60 border border-white/10'
                }`}
              >
                Prodej
              </button>
            </div>
          </div>

          {/* Množství */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Množství {cryptoSymbol}
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="number"
                step="0.00000001"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-white focus:outline-none focus:border-[#F9D523]/50 focus:bg-white/10"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Cena za jednotku */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Cena za {cryptoSymbol} (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-white focus:outline-none focus:border-[#F9D523]/50 focus:bg-white/10"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Datum a čas */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Datum
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F9D523]/50 focus:bg-white/10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Čas
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F9D523]/50 focus:bg-white/10"
                required
              />
            </div>
          </div>

          {/* Poplatek */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Poplatek (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="number"
                step="0.01"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-white focus:outline-none focus:border-[#F9D523]/50 focus:bg-white/10"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Poznámka */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Poznámka
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-white/40" />
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-white focus:outline-none focus:border-[#F9D523]/50 focus:bg-white/10"
                rows={3}
                placeholder="Volitelná poznámka k transakci..."
              />
            </div>
          </div>

          {/* Celková hodnota */}
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Celková hodnota:</span>
              <span className="text-xl font-semibold text-[#F9D523]">
                ${totalValue.toLocaleString('cs-CZ', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Tlačítka */}
          <div className="flex gap-3 pt-4">
            <DashboardButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Zrušit
            </DashboardButton>
            <DashboardButton
              type="submit"
              variant="primary"
              className="flex-1"
            >
              {transaction ? 'Uložit změny' : 'Přidat transakci'}
            </DashboardButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function CryptoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, walletAddress } = useWallet();
  const { isInAdminGroup } = useAuth();
  const projectId = params?.projectId as string;
  const cryptoId = params?.cryptoId as string;
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [cryptoData, setCryptoData] = useState({
    symbol: '',
    name: '',
    currentPrice: 0,
    avgBuyPrice: 0,
    totalAmount: 0,
    totalValue: 0
  });

  useEffect(() => {
    // Načtení dat podle cryptoId
    const cryptoMap: Record<string, { symbol: string; name: string; currentPrice: number; avgBuyPrice: number; totalAmount: number; totalValue: number }> = {
      'btc-gc': { symbol: 'BTC', name: 'Bitcoin', currentPrice: 35000, avgBuyPrice: 32000, totalAmount: 2.5, totalValue: 87500 },
      'eth-gc': { symbol: 'ETH', name: 'Ethereum', currentPrice: 2000, avgBuyPrice: 1800, totalAmount: 15, totalValue: 30000 },
      'ada-gc': { symbol: 'ADA', name: 'Cardano', currentPrice: 0.40, avgBuyPrice: 0.35, totalAmount: 10000, totalValue: 4000 },
      'avax-gc': { symbol: 'AVAX', name: 'Avalanche', currentPrice: 25.6, avgBuyPrice: 28, totalAmount: 150, totalValue: 3840 },
      'sol-gc': { symbol: 'SOL', name: 'Solana', currentPrice: 20.02, avgBuyPrice: 18, totalAmount: 25, totalValue: 500.50 },
      'btc-bot': { symbol: 'BTC', name: 'Bitcoin', currentPrice: 35000, avgBuyPrice: 33000, totalAmount: 1, totalValue: 35000 },
      'usdt-bot': { symbol: 'USDT', name: 'Tether', currentPrice: 1, avgBuyPrice: 1, totalAmount: 5000, totalValue: 5000 },
      'usdc-bot': { symbol: 'USDC', name: 'USD Coin', currentPrice: 1, avgBuyPrice: 1, totalAmount: 5320.75, totalValue: 5320.75 },
      'eth-algo': { symbol: 'ETH', name: 'Ethereum', currentPrice: 2000, avgBuyPrice: 1900, totalAmount: 10, totalValue: 20000 },
      'bnb-algo': { symbol: 'BNB', name: 'Binance Coin', currentPrice: 300, avgBuyPrice: 280, totalAmount: 50, totalValue: 15000 },
      'matic-algo': { symbol: 'MATIC', name: 'Polygon', currentPrice: 0.90, avgBuyPrice: 0.85, totalAmount: 20000, totalValue: 18000 },
      'link-algo': { symbol: 'LINK', name: 'Chainlink', currentPrice: 15.50, avgBuyPrice: 14.50, totalAmount: 1000, totalValue: 15500 }
    };
    
    const crypto = cryptoMap[cryptoId as string];
    if (crypto) {
      setCryptoData(crypto);
      // Set some dummy transactions
      if (cryptoId === 'btc-gc' && DUMMY_TRANSACTIONS['btc-gc']) {
        setTransactions(DUMMY_TRANSACTIONS['btc-gc']);
      } else if (cryptoId === 'eth-gc' && DUMMY_TRANSACTIONS['eth-gc']) {
        setTransactions(DUMMY_TRANSACTIONS['eth-gc']);
      } else {
        // Generate some dummy transactions for other cryptos
        setTransactions([
          {
            id: '1',
            type: 'buy',
            amount: crypto.totalAmount * 0.5,
            price: crypto.avgBuyPrice * 0.9,
            totalValue: crypto.totalAmount * 0.5 * crypto.avgBuyPrice * 0.9,
            date: '2024-01-15T10:30:00',
            note: 'Počáteční nákup',
            fee: 10
          },
          {
            id: '2',
            type: 'buy',
            amount: crypto.totalAmount * 0.5,
            price: crypto.avgBuyPrice * 1.1,
            totalValue: crypto.totalAmount * 0.5 * crypto.avgBuyPrice * 1.1,
            date: '2024-02-20T14:15:00',
            note: 'Dokoupení',
            fee: 12
          }
        ]);
      }
    }
  }, [cryptoId]);

  // Výpočty
  const totalBought = transactions
    .filter(t => t.type === 'buy')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalSold = transactions
    .filter(t => t.type === 'sell')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalFees = transactions
    .reduce((sum, t) => sum + t.fee, 0);
  
  const avgBuyPrice = transactions
    .filter(t => t.type === 'buy')
    .reduce((sum, t, _, arr) => sum + t.price / arr.length, 0);
  
  const profitLoss = (cryptoData.currentPrice - cryptoData.avgBuyPrice) * cryptoData.totalAmount;
  const profitLossPercent = ((cryptoData.currentPrice - cryptoData.avgBuyPrice) / cryptoData.avgBuyPrice) * 100;

  // Handlers
  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Opravdu chcete smazat tuto transakci?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      // TODO: Backend call
    }
  };

  const handleSaveTransaction = (transactionData: Partial<Transaction>) => {
    if (editingTransaction) {
      // Update
      setTransactions(prev => prev.map(t => 
        t.id === editingTransaction.id 
          ? { ...t, ...transactionData } as Transaction
          : t
      ));
    } else {
      // Add new
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...transactionData
      } as Transaction;
      setTransactions(prev => [...prev, newTransaction]);
    }
    setIsModalOpen(false);
    // TODO: Backend call
  };

  const handleExportTransactions = () => {
    // TODO: Export transakcí
    console.log('Export transactions');
  };

  // Navigace zpět
  const handleBack = () => {
    router.push(`/admin/portfolio/${projectId}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        {/* Navigace zpět */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zpět na detail projektu</span>
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {cryptoData.symbol} - {cryptoData.name}
            </h1>
            <p className="text-white/60">
              Správa transakcí a historie obchodů
            </p>
          </div>
          
          <div className="flex gap-3">
            <DashboardButton
              variant="secondary"
              onClick={handleExportTransactions}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </DashboardButton>
            
            {isInAdminGroup && (
              <DashboardButton
                variant="primary"
                onClick={handleAddTransaction}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Přidat transakci
              </DashboardButton>
            )}
          </div>
        </div>

        {/* Statistiky */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ValueCard 
            label="Aktuální hodnota" 
            value={`$${cryptoData.totalValue.toLocaleString('cs-CZ')}`}
            variant="default"
          >
            <p className="text-xs text-white/70 mt-2">
              {cryptoData.totalAmount} {cryptoData.symbol}
            </p>
          </ValueCard>

          <ValueCard 
            label="Průměrná nákupní cena" 
            value={`$${avgBuyPrice.toLocaleString('cs-CZ')}`}
            variant="default"
          >
            <p className="text-xs text-white/70 mt-2">
              Aktuální: ${cryptoData.currentPrice.toLocaleString('cs-CZ')}
            </p>
          </ValueCard>

          <ValueCard 
            label="P&L" 
            value={`${profitLoss >= 0 ? '+' : ''}$${Math.abs(profitLoss).toLocaleString('cs-CZ')}`}
            variant="default"
          >
            <div className={`text-xs mt-2 ${
              profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {profitLoss >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%
            </div>
          </ValueCard>

          <ValueCard 
            label="Celkem poplatků" 
            value={`$${totalFees.toLocaleString('cs-CZ')}`}
            variant="default"
          >
            <p className="text-xs text-white/70 mt-2">
              {transactions.length} transakcí
            </p>
          </ValueCard>
        </div>

        {/* Info karty */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <InfoCard
            title="Nakoupeno"
            icon={
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
            }
          >
            <p className="text-2xl font-bold text-white">
              {totalBought.toLocaleString('cs-CZ')} {cryptoData.symbol}
            </p>
            <p className="text-xs text-white/50 mt-1">
              {transactions.filter(t => t.type === 'buy').length} nákupů
            </p>
          </InfoCard>

          <InfoCard
            title="Prodáno"
            icon={
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
            }
          >
            <p className="text-2xl font-bold text-white">
              {totalSold.toLocaleString('cs-CZ')} {cryptoData.symbol}
            </p>
            <p className="text-xs text-white/50 mt-1">
              {transactions.filter(t => t.type === 'sell').length} prodejů
            </p>
          </InfoCard>

          <InfoCard
            title="Aktuální zůstatek"
            icon={
              <div className="w-8 h-8 bg-[#F9D523]/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#F9D523]" />
              </div>
            }
          >
            <p className="text-2xl font-bold text-white">
              {(totalBought - totalSold).toLocaleString('cs-CZ')} {cryptoData.symbol}
            </p>
            <p className="text-xs text-white/50 mt-1">
              ${((totalBought - totalSold) * cryptoData.currentPrice).toLocaleString('cs-CZ')}
            </p>
          </InfoCard>
        </div>

        {/* Tabulka transakcí */}
        <DashboardCard className="p-0">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">
              Historie transakcí
            </h3>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Typ</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Datum</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Množství</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Cena/jednotka</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Celková hodnota</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Poplatek</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Poznámka</th>
                  {isInAdminGroup && <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Akce</th>}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        transaction.type === 'buy' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.type === 'buy' ? 'Nákup' : 'Prodej'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white/70">
                        {new Date(transaction.date).toLocaleString('cs-CZ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white">
                        {transaction.amount.toLocaleString('cs-CZ')} {cryptoData.symbol}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white">
                        ${transaction.price.toLocaleString('cs-CZ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[#F9D523] font-semibold">
                        ${transaction.totalValue.toLocaleString('cs-CZ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white/60">
                        ${transaction.fee.toLocaleString('cs-CZ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white/60 text-sm">
                        {transaction.note || '-'}
                      </span>
                    </td>
                    {isInAdminGroup && (
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTransaction(transaction)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-white/60" />
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="p-1 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

      {/* Modal pro transakce */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        transaction={editingTransaction}
        cryptoSymbol={cryptoData.symbol}
      />
    </div>
  );
}