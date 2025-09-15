import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import csNavbar from './locales/cs/navbar.json';
import csHero from './locales/cs/hero.json';
import csCards from './locales/cs/cards.json';
import csEcosystem from './locales/cs/ecosystem.json';
import csRoadmap from './locales/cs/roadmap.json';
import csVip from './locales/cs/vip.json';
import csTeam from './locales/cs/team.json';
import csFaq from './locales/cs/faq.json';
import csFooter from './locales/cs/footer.json';

import enNavbar from './locales/en/navbar.json';
import enHero from './locales/en/hero.json';
import enCards from './locales/en/cards.json';
import enEcosystem from './locales/en/ecosystem.json';
import enRoadmap from './locales/en/roadmap.json';
import enVip from './locales/en/vip.json';
import enTeam from './locales/en/team.json';
import enFaq from './locales/en/faq.json';
import enFooter from './locales/en/footer.json';

import arNavbar from './locales/ar/navbar.json';
import arHero from './locales/ar/hero.json';
import arCards from './locales/ar/cards.json';
import arEcosystem from './locales/ar/ecosystem.json';
import arRoadmap from './locales/ar/roadmap.json';
import arVip from './locales/ar/vip.json';
import arTeam from './locales/ar/team.json';
import arFaq from './locales/ar/faq.json';
import arFooter from './locales/ar/footer.json';

const resources = {
  cs: {
    navbar: csNavbar,
    hero: csHero,
    cards: csCards,
    ecosystem: csEcosystem,
    roadmap: csRoadmap,
    vip: csVip,
    team: csTeam,
    faq: csFaq,
    footer: csFooter,
  },
  en: {
    navbar: enNavbar,
    hero: enHero,
    cards: enCards,
    ecosystem: enEcosystem,
    roadmap: enRoadmap,
    vip: enVip,
    team: enTeam,
    faq: enFaq,
    footer: enFooter,
  },
  ar: {
    navbar: arNavbar,
    hero: arHero,
    cards: arCards,
    ecosystem: arEcosystem,
    roadmap: arRoadmap,
    vip: arVip,
    team: arTeam,
    faq: arFaq,
    footer: arFooter,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'cs', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;