'use client';

import React from 'react';
import { VerifiedBadge, PremiumCTA, GlassCTA, OutlineCTA } from '@/components/ui/premium-button';

export default function ButtonsDemoPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Premium Button Styles Demo
          </h1>
          <p className="text-white/70 text-lg">
            Figma-inspired buttons with teal hover effects
          </p>
        </div>

        {/* Verified Badge Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
            Verified Badges
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <VerifiedBadge size="sm">Verified</VerifiedBadge>
            <VerifiedBadge size="md">Verified</VerifiedBadge>
            <VerifiedBadge size="lg">Verified</VerifiedBadge>
          </div>
          <div className="text-white/60 text-sm">
            ✨ Hover for teal glow effect and shine animation
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
            Premium CTA Buttons
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <PremiumCTA size="sm">Get Started</PremiumCTA>
            <PremiumCTA size="md">Sign Up Now</PremiumCTA>
            <PremiumCTA size="lg">Join Premium</PremiumCTA>
          </div>
          <div className="text-white/60 text-sm">
            🎨 Gradient background with teal accent on hover
          </div>
        </section>

        {/* Glass CTA Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
            Glass CTA Buttons
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <GlassCTA size="sm">Learn More</GlassCTA>
            <GlassCTA size="md">Explore Features</GlassCTA>
            <GlassCTA size="lg">Start Journey</GlassCTA>
          </div>
          <div className="text-white/60 text-sm">
            💎 Glassmorphism with teal transformation on hover
          </div>
        </section>

        {/* Outline CTA Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
            Outline CTA Buttons
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <OutlineCTA size="sm">Secondary</OutlineCTA>
            <OutlineCTA size="md">Learn More</OutlineCTA>
            <OutlineCTA size="lg">Contact Us</OutlineCTA>
          </div>
          <div className="text-white/60 text-sm">
            🌊 Gradient border with teal background on hover
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
            Interactive Demo
          </h2>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6">
            
            <div className="text-center space-y-4">
              <VerifiedBadge size="md">Certified Platform</VerifiedBadge>
              <h3 className="text-2xl font-bold text-white">
                Join Gavlik Capital NFT Cards
              </h3>
              <p className="text-white/70">
                Experience premium trading with our exclusive membership
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PremiumCTA 
                size="lg"
                onClick={() => alert('Premium CTA clicked!')}
              >
                Get Your Card
              </PremiumCTA>
              
              <GlassCTA 
                size="lg"
                onClick={() => alert('Glass CTA clicked!')}
              >
                Learn More
              </GlassCTA>
            </div>

            <div className="flex justify-center">
              <OutlineCTA 
                size="md"
                onClick={() => alert('Outline CTA clicked!')}
              >
                Join Discord Community
              </OutlineCTA>
            </div>
          </div>
        </section>

        {/* Color Palette Reference */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-gradient-to-r from-[#B29819] to-[#F9D523] rounded-lg"></div>
              <div className="text-center text-white/70 text-sm">Gold Gradient</div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-[#14B8A6] rounded-lg"></div>
              <div className="text-center text-white/70 text-sm">Teal Accent</div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg"></div>
              <div className="text-center text-white/70 text-sm">Glass Effect</div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-gradient-to-r from-[#F9D523] to-[#14B8A6] rounded-lg"></div>
              <div className="text-center text-white/70 text-sm">Hover Gradient</div>
            </div>
          </div>
        </section>

        {/* Back to home */}
        <div className="text-center pt-8">
          <GlassCTA href="/" size="md">
            ← Back to Landing Page
          </GlassCTA>
        </div>
      </div>
    </div>
  );
}