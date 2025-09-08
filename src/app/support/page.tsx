'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardCard, DashboardButton } from '@/components/dashboard';
import { MessageCircle, Mail, Phone, Clock, FileText, AlertCircle, CheckCircle, Users } from 'lucide-react';

interface UserProfile {
  name: string;
  avatar?: string;
  email?: string;
  address?: string;
  kycVerified?: boolean;
}

export default function SupportPage() {
  const [userProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    kycVerified: true
  });

  const [supportForm, setSupportForm] = useState({
    category: '',
    priority: '',
    subject: '',
    message: ''
  });

  const supportCategories = [
    { value: 'technical', label: 'Technická podpora' },
    { value: 'account', label: 'Problémy s účtem' },
    { value: 'trading', label: 'Obchodování a transakce' },
    { value: 'billing', label: 'Fakturace a platby' },
    { value: 'general', label: 'Obecné dotazy' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Nízká', color: 'text-green-400' },
    { value: 'medium', label: 'Střední', color: 'text-yellow-400' },
    { value: 'high', label: 'Vysoká', color: 'text-orange-400' },
    { value: 'urgent', label: 'Urgentní', color: 'text-red-400' }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
      title: 'Live Chat',
      description: 'Okamžitá pomoc s naším týmem podpory',
      availability: '24/7',
      action: 'Zahájit chat'
    },
    {
      icon: <Mail className="w-8 h-8 text-green-500" />,
      title: 'Email podpora',
      description: 'support@gavlikcapital.com',
      availability: 'Odpověď do 4 hodin',
      action: 'Napsat email'
    },
    {
      icon: <Phone className="w-8 h-8 text-purple-500" />,
      title: 'Telefonní podpora',
      description: '+420 123 456 789',
      availability: 'Po-Pá 8:00-18:00',
      action: 'Zavolat'
    }
  ];

  const faqItems = [
    {
      question: 'Jak mohu ověřit svůj účet?',
      answer: 'Proces ověření účtu je jednoduchý. Přejděte do nastavení profilu a nahrajte požadované dokumenty...'
    },
    {
      question: 'Jaké jsou poplatky za transakce?',
      answer: 'Naše transparentní struktura poplatků zahrnuje...'
    },
    {
      question: 'Jak funguje BTC Bot?',
      answer: 'BTC Bot je automatizovaný obchodní systém, který...'
    },
    {
      question: 'Mohu změnit svou investiční strategii?',
      answer: 'Ano, svou strategii můžete upravit kdykoli v sekci Portfolio...'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support ticket submitted:', supportForm);
    // Zde by byla logika pro odeslání tiketu
  };

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Zákaznická podpora" 
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Zákaznická podpora</h1>
          <p className="text-white/70 text-lg max-w-3xl">
            Jsme tu pro vás 24/7. Náš specializovaný tým podpory vám pomůže s jakýmkoli dotazem 
            nebo problémem týkajícím se platformy Gavlik Capital.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactMethods.map((method, index) => (
            <DashboardCard key={index} className="text-center">
              <div className="py-6">
                <div className="flex justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-white/70 text-sm mb-2">{method.description}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-white/50" />
                  <span className="text-white/50 text-xs">{method.availability}</span>
                </div>
                <DashboardButton variant="primary" className="w-full">
                  {method.action}
                </DashboardButton>
              </div>
            </DashboardCard>
          ))}
        </div>

        {/* Support Ticket Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <DashboardCard title="Vytvořit support tiket">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Kategorie problému
                    </label>
                    <select
                      value={supportForm.category}
                      onChange={(e) => setSupportForm({...supportForm, category: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#F9D523] focus:outline-none"
                      required
                    >
                      <option value="">Vyberte kategorii</option>
                      {supportCategories.map((cat) => (
                        <option key={cat.value} value={cat.value} className="bg-gray-800">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Priorita
                    </label>
                    <select
                      value={supportForm.priority}
                      onChange={(e) => setSupportForm({...supportForm, priority: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#F9D523] focus:outline-none"
                      required
                    >
                      <option value="">Vyberte prioritu</option>
                      {priorityLevels.map((priority) => (
                        <option key={priority.value} value={priority.value} className="bg-gray-800">
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Předmět
                  </label>
                  <input
                    type="text"
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                    placeholder="Stručný popis problému"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:border-[#F9D523] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Podrobný popis problému
                  </label>
                  <textarea
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                    placeholder="Popište váš problém co nejpodrobněji..."
                    rows={6}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:border-[#F9D523] focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <DashboardButton type="submit" variant="primary" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Odeslat tiket
                  </DashboardButton>
                  <DashboardButton 
                    type="button" 
                    variant="secondary"
                    onClick={() => setSupportForm({ category: '', priority: '', subject: '', message: '' })}
                  >
                    Vymazat
                  </DashboardButton>
                </div>
              </form>
            </DashboardCard>
          </div>

          {/* Status & Quick Info */}
          <div className="space-y-6">
            <DashboardCard title="Status systému">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Platforma</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-400 text-sm">Funkční</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">API služby</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-400 text-sm">Funkční</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Blockchain síť</span>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-400 text-sm">Údržba</span>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Průměrná doba odezvy">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F9D523] mb-2">2.3h</div>
                  <p className="text-white/70 text-sm">Průměrná doba první odpovědi</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-white mb-2">98.5%</div>
                  <p className="text-white/70 text-sm">Spokojenost zákazníků</p>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* FAQ Section */}
        <DashboardCard title="Často kladené otázky">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group">
                <summary className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="text-white font-medium">{item.question}</span>
                  <span className="text-white/50 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 p-4 bg-white/5 rounded-lg">
                  <p className="text-white/70">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <DashboardButton variant="secondary">
              Zobrazit všechny FAQ
            </DashboardButton>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}