'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardButton, DashboardCard } from '@/components/dashboard';
import { AvatarUpload } from '@/components/ui/file-upload';
import { useToast } from '@/components/ui/toast';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  CreditCard,
  Eye,
  EyeOff,
  Save,
  Key,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Settings as SettingsIcon
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: 'Jan',
    lastName: 'Novák',
    email: 'jan.novak@email.cz',
    phone: '+420 123 456 789',
    dateOfBirth: '1990-05-15',
    address: 'Praha, Česká republika',
    bio: 'Investor a nadšenec do kryptoměn s více než 5 lety zkušeností.',
    website: 'https://jannovak.cz',
    timezone: 'Europe/Prague'
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
      system: false,
      marketing: false
    },
    privacy: {
      showBalance: true,
      showTransactions: false,
      showProfile: true,
      allowAnalytics: true
    },
    trading: {
      confirmations: true,
      stopLoss: true,
      riskWarnings: true,
      advancedMode: false
    }
  });
  
  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    backupCodes: [],
    sessionTimeout: 30,
    loginNotifications: true
  });

  // Mock user data
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Zabezpečení', icon: Shield },
    { id: 'notifications', label: 'Notifikace', icon: Bell },
    { id: 'preferences', label: 'Předvolby', icon: Palette },
    { id: 'wallet', label: 'Peněženka', icon: CreditCard },
    { id: 'privacy', label: 'Soukromí', icon: Eye }
  ];

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // await updateProfile(profileData);
      success('Profil aktualizován', 'Vaše změny byly úspěšně uloženy');
    } catch (err) {
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
    } catch (err) {
      error('Chyba při změně hesla', 'Nepodařilo se změnit heslo');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (file: File) => {
    console.log('Avatar changed:', file);
    success('Avatar aktualizován', 'Váš avatar byl úspěšně změněn');
  };

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substr(2, 8).toUpperCase()
    );
    setSecurityData({ ...securityData, backupCodes: codes });
    success('Záložní kódy vygenerovány', 'Uložte si je na bezpečné místo');
  };

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Nastavení"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="glass-card p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all
                        ${activeTab === tab.id 
                          ? 'bg-[#F9D523] text-black' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <DashboardCard className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <SettingsIcon className="w-6 h-6 text-[#F9D523]" />
                    <h2 className="text-xl font-semibold text-white">Osobní údaje</h2>
                  </div>
                  
                  {/* Avatar */}
                  <div className="flex items-center space-x-6 mb-8">
                    <AvatarUpload
                      onAvatarChange={handleAvatarChange}
                      size="lg"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-white/60 mb-3">{profileData.email}</p>
                      <DashboardButton variant="secondary" size="sm">
                        Změnit profilový obrázek
                      </DashboardButton>
                    </div>
                  </div>
                  
                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        <User className="w-4 h-4 inline mr-2" />
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
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
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
                        <Phone className="w-4 h-4 inline mr-2" />
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
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Datum narození
                      </label>
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                        className="input-glass w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Časová zóna
                      </label>
                      <select
                        value={profileData.timezone}
                        onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                        className="input-glass w-full"
                      >
                        <option value="Europe/Prague">Praha (UTC+1)</option>
                        <option value="Europe/London">Londýn (UTC+0)</option>
                        <option value="America/New_York">New York (UTC-5)</option>
                        <option value="Asia/Tokyo">Tokio (UTC+9)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-white mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Adresa
                    </label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="input-glass w-full"
                    />
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-white mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="input-glass w-full h-24 resize-none"
                      placeholder="Něco o sobě..."
                    />
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-white mb-2">
                      Webové stránky
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      className="input-glass w-full"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <DashboardButton
                      onClick={handleSaveProfile}
                      variant="primary"
                      disabled={loading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Uložit změny
                    </DashboardButton>
                  </div>
                </DashboardCard>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Password Change */}
                <DashboardCard className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Key className="w-6 h-6 text-[#F9D523]" />
                    <h3 className="text-lg font-semibold text-white">Změna hesla</h3>
                  </div>
                  <div className="space-y-4 max-w-md">
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
                </DashboardCard>
                
                {/* Two Factor Authentication */}
                <DashboardCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Smartphone className="w-6 h-6 text-[#F9D523]" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Dvoufázové ověření</h3>
                        <p className="text-white/60 text-sm">Dodatečná ochrana vašeho účtu</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {securityData.twoFactorEnabled ? (
                        <span className="flex items-center text-green-500 text-sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aktivní
                        </span>
                      ) : (
                        <span className="flex items-center text-red-500 text-sm">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Neaktivní
                        </span>
                      )}
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
                  
                  {securityData.twoFactorEnabled && (
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-yellow-400 text-sm">
                          Doporučujeme vygenerovat záložní kódy pro případ ztráty přístupu k vašemu telefonu.
                        </p>
                      </div>
                      
                      <DashboardButton
                        onClick={generateBackupCodes}
                        variant="secondary"
                      >
                        Vygenerovat záložní kódy
                      </DashboardButton>
                      
                      {securityData.backupCodes.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-white mb-2">Záložní kódy</h4>
                          <div className="grid grid-cols-2 gap-2 p-4 bg-white/5 rounded-lg">
                            {securityData.backupCodes.map((code, index) => (
                              <code key={index} className="text-xs text-white bg-black/20 p-2 rounded">
                                {code}
                              </code>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </DashboardCard>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <DashboardCard className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Bell className="w-6 h-6 text-[#F9D523]" />
                  <h2 className="text-xl font-semibold text-white">Nastavení notifikací</h2>
                </div>
                <div className="space-y-6">
                  {Object.entries(settings.notifications).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      email: 'E-mailové notifikace',
                      push: 'Push notifikace',
                      dividends: 'Notifikace o dividendách',
                      trades: 'Notifikace o obchodech',
                      system: 'Systémové notifikace',
                      marketing: 'Marketingové nabídky'
                    };
                    
                    return (
                      <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{labels[key]}</div>
                          <div className="text-white/60 text-sm">
                            {key === 'email' && 'Dostávat důležité informace e-mailem'}
                            {key === 'push' && 'Zobrazovat notifikace v prohlížeči'}
                            {key === 'dividends' && 'Informace o vyplacených dividendách'}
                            {key === 'trades' && 'Potvrzení obchodních operací'}
                            {key === 'system' && 'Aktualizace systému a údržba'}
                            {key === 'marketing' && 'Nabídky a novinky'}
                          </div>
                        </div>
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
                    );
                  })}
                </div>
              </DashboardCard>
            )}

            {/* Other tabs would continue here... */}
            {activeTab === 'preferences' && (
              <DashboardCard className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Palette className="w-6 h-6 text-[#F9D523]" />
                  <h2 className="text-xl font-semibold text-white">Předvolby</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Téma</label>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                      className="input-glass w-full max-w-xs"
                    >
                      <option value="dark">Tmavé</option>
                      <option value="light">Světlé</option>
                      <option value="auto">Automatické</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Jazyk</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="input-glass w-full max-w-xs"
                    >
                      <option value="cs">Čeština</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Měna</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="input-glass w-full max-w-xs"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="CZK">CZK (Kč)</option>
                    </select>
                  </div>
                </div>
              </DashboardCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
