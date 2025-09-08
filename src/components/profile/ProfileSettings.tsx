"use client";

import React, { useState } from "react";
import { Save, User, Mail, Globe, Twitter, Linkedin, Github, Check, AlertCircle } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export const ProfileSettings: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    twitter: "",
    linkedin: "",
    github: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulace ukládání
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Nastavení profilu</h1>
        <p className="text-white/60">
          Vyplňte své údaje pro KYC ověření. Po ověření se vaše jméno zobrazí místo adresy peněženky.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* KYC Status Banner */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-yellow-500 font-medium">KYC ověření čeká na dokončení</p>
              <p className="text-white/60 text-sm mt-1">
                Vyplňte všechny povinné údaje pro ověření vašeho účtu
              </p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-[#F9D523]" />
              Osobní údaje
            </h2>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Jméno a příjmení <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Jan Novák"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                         text-white placeholder-white/30 
                         focus:outline-none focus:border-[#F9D523] focus:bg-white/10 
                         transition-all duration-300 hover:border-white/30"
              />
              <p className="text-xs text-white/40 mt-1">
                Toto jméno se zobrazí místo vaší adresy peněženky
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="vas@email.cz"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                           text-white placeholder-white/30 
                           focus:outline-none focus:border-[#F9D523] focus:bg-white/10 
                           transition-all duration-300 hover:border-white/30"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#F9D523]" />
              Sociální sítě 
              <span className="text-sm font-normal text-white/40">(nepovinné)</span>
            </h2>

            {/* Twitter */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Twitter / X
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={profileData.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/vasprofil"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                           text-white placeholder-white/30 
                           focus:outline-none focus:border-[#F9D523] focus:bg-white/10 
                           transition-all duration-300 hover:border-white/30"
                />
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                LinkedIn
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={profileData.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/vasprofil"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                           text-white placeholder-white/30 
                           focus:outline-none focus:border-[#F9D523] focus:bg-white/10 
                           transition-all duration-300 hover:border-white/30"
                />
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                GitHub
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={profileData.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  placeholder="https://github.com/vasprofil"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                           text-white placeholder-white/30 
                           focus:outline-none focus:border-[#F9D523] focus:bg-white/10 
                           transition-all duration-300 hover:border-white/30"
                />
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="relative px-8 py-3 bg-gradient-to-r from-[#B29819] to-[#F9D523] 
                       text-black font-bold rounded-lg 
                       hover:from-[#F9D523] hover:to-[#E6C547] 
                       transform hover:scale-105 hover:shadow-[0_0_30px_rgba(249,213,35,0.4)]
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Ukládám...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Uloženo!</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Uložit profil</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* KYC Benefits */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Výhody KYC ověření</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span>Zobrazení vašeho jména místo adresy peněženky</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span>Vyšší limity pro transakce</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span>Přístup k exkluzivním funkcím</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span>Ověřený status v komunitě</span>
            </li>
          </ul>
        </div>

        {/* Privacy Notice */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Ochrana soukromí</h3>
          <p className="text-white/70 text-sm mb-3">
            Vaše osobní údaje jsou bezpečně šifrovány a používány pouze pro účely ověření identity.
          </p>
          <p className="text-white/70 text-sm">
            Sociální sítě jsou nepovinné a slouží pouze pro lepší propojení s komunitou.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;