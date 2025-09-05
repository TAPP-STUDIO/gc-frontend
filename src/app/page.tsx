'use client';

import React from 'react';
import { 
  Navbar, 
  Hero, 
  InfoSection, 
  Ecosystem, 
  Roadmap, 
  VipClub,
  Team,
  FAQ, 
  Footer 
} from '@/components/landing';

export default function MainPage() {
  return (
    <div className="min-h-screen overflow-visible">
      <Navbar />
      <Hero />
      <InfoSection />
      <Ecosystem />
      <Roadmap />
      <VipClub />
      <Team />
      <FAQ />
      <Footer />
    </div>
  );
}
