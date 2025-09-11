'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { DashboardButton } from '@/components/dashboard';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  CreditCard,
  Save,
  Upload,
  Copy,
  ExternalLink
} from 'lucide-react';

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  address?: string;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function UserProfileModal({ isOpen, onClose, user }: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'cs',
    currency: 'USD',
    notifications: {
      email: true,
      push: true,
      dividends: true,
      trades: true,
      system: false
    },
    privacy: {
      showBalance: true,
      showTransactions: false,
      showProfile: true
    }
  });
  
  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Zabezpečení', icon: Shield },
    { id: 'settings', label: 'Nastavení', icon: Bell },
    { id: 'wallet', label: 'Peněženka', icon: CreditCard }
  ];

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // await updateProfile(profileData);
      success('Profil aktualizován', 'Vaše změny byly úspěšně uloženy');
    } catch {
      error('Chyba při ukládání', 'Nepodařilo se aktualizovat profil');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      error('Hesla se neshodují', 'Nové heslo a potvrzení se musí shodovat');
      return;
    }
    
    if (securityData.newPassword.length < 8) {
      error('Slabé heslo', 'Heslo musí mít alespoň 8 znaků');
      return;
    }

    setLoading(true);
    try {
      // await changePassword(securityData.currentPassword, securityData.newPassword);
      success('Heslo změněno', 'Vaše heslo bylo úspěšně aktualizováno');
      setSecurityData({ ...securityData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      error('Chyba při změně hesla', 'Nepodařilo se změnit heslo');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    success('Zkopírováno', 'Text byl zkopírován do schránky');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Uživatelský profil"
      size="lg"
    >
      <div className="flex h-[600px]">
        
        {/* Sidebar */}
        <div className="w-48 border-r border-white/10 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${activeTab === tab.id 
                      ? 'bg-[#F9D523] text-black' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Osobní údaje</h3>
              
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F9D523] to-[#E6C400] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">
                    {(profileData.firstName[0] || 'U').toUpperCase()}
                  </span>
                </div>
                <div>
                  <DashboardButton variant="secondary" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Změnit foto
                  </DashboardButton>
                </div>
              </div>
              
              {/* Form */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Jméno
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="input-glass w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Příjmení
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="input-glass w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="input-glass w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="input-glass w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="input-glass w-full h-20 resize-none"
                  placeholder="Něco o sobě..."
                />
              </div>
              
              <div className="flex justify-end">
                <DashboardButton
                  onClick={handleSaveProfile}
                  variant="primary"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Uložit změny
                </DashboardButton>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Zabezpečení</h3>
              
              {/* Change Password */}
              <div className="glass-card p-4">
                <h4 className="font-medium text-white mb-4">Změna hesla</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Současné heslo
                    </label>
                    <input
                      type="password"
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      className="input-glass w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nové heslo
                    </label>
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      className="input-glass w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Potvrzení hesla
                    </label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      className="input-glass w-full"
                    />
                  </div>
                  <DashboardButton
                    onClick={handleChangePassword}
                    variant="primary"
                    disabled={loading || !securityData.currentPassword || !securityData.newPassword}
                  >
                    Změnit heslo
                  </DashboardButton>
                </div>
              </div>
              
              {/* Two Factor Authentication */}
              <div className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Dvoufázové ověření</h4>
                    <p className="text-white/60 text-sm">Dodatečná ochrana vašeho účtu</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securityData.twoFactorEnabled}
                      onChange={(e) => setSecurityData({ ...securityData, twoFactorEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F9D523]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Nastavení</h3>
              
              {/* Appearance */}
              <div className="glass-card p-4">
                <h4 className="font-medium text-white mb-4 flex items-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Vzhled
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Téma
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                      className="input-glass w-full"
                    >
                      <option value="dark">Tmavé</option>
                      <option value="light">Světlé</option>
                      <option value="auto">Automatické</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Jazyk
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="input-glass w-full"
                    >
                      <option value="cs">Čeština</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Měna
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="input-glass w-full"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="CZK">CZK (Kč)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Notifications */}
              <div className="glass-card p-4">
                <h4 className="font-medium text-white mb-4 flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifikace
                </h4>
                <div className="space-y-3">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-white/80 capitalize">
                        {key === 'email' ? 'E-mail' :
                         key === 'push' ? 'Push notifikace' :
                         key === 'dividends' ? 'Dividendy' :
                         key === 'trades' ? 'Obchody' : 'Systémové'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, [key]: e.target.checked }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F9D523]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Peněženka</h3>
              
              {/* Wallet Address */}
              <div className="glass-card p-4">
                <h4 className="font-medium text-white mb-4">Adresa peněženky</h4>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 font-mono text-sm text-white/80 bg-white/5 p-3 rounded">
                    {user?.address || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3'}
                  </div>
                  <DashboardButton
                    onClick={() => copyToClipboard(user?.address || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3')}
                    variant="secondary"
                    size="sm"
                  >
                    <Copy className="w-4 h-4" />
                  </DashboardButton>
                  <DashboardButton
                    onClick={() => window.open(`https://etherscan.io/address/${user?.address}`, '_blank')}
                    variant="secondary"
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </DashboardButton>
                </div>
              </div>
              
              {/* Balance */}
              <div className="glass-card p-4">
                <h4 className="font-medium text-white mb-4">Zůstatek</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F9D523]">$1,250.00</div>
                    <div className="text-white/60 text-sm">USD</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">0.45</div>
                    <div className="text-white/60 text-sm">ETH</div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-3">
                <DashboardButton variant="primary" className="flex-1">
                  Vložit prostředky
                </DashboardButton>
                <DashboardButton variant="secondary" className="flex-1">
                  Vybrat prostředky
                </DashboardButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
