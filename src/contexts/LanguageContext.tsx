'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'cs' | 'en' | 'ar';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  languages: Array<{
    code: Language;
    name: string;
    flag: string;
    dir: 'ltr' | 'rtl';
  }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('cs');

  const languages = [
    { code: 'cs' as Language, name: 'Čeština', flag: '🇨🇿', dir: 'ltr' as const },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧', dir: 'ltr' as const },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦', dir: 'rtl' as const },
  ];

  useEffect(() => {
    // Load language from localStorage on component mount
    const savedLanguage = localStorage.getItem('gc-language') as Language;
    if (savedLanguage && ['cs', 'en', 'ar'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
      
      // Set document direction for Arabic
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
    }
  }, [i18n]);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('gc-language', language);
    
    // Set document direction for Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    languages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};