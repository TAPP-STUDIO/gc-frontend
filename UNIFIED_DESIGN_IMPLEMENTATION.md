# 🎨 Unified Dashboard Design System - Implementační Průvodce

## Přehled
Tento dokument popisuje kompletní implementaci jednotného design systému z landing page do všech částí dashboardu (uživatelského i admin).

## 📁 Struktura souborů

```
src/
├── styles/
│   └── unified-dashboard.css     # Hlavní stylesheet s unified designem
├── components/
│   ├── ui/
│   │   ├── glass-card.tsx       # Glass morphism karty
│   │   ├── unified-button.tsx   # Unified tlačítka
│   │   └── stats-card.tsx       # Statistické karty
│   └── layout/
│       ├── unified-sidebar.tsx   # Upravený sidebar
│       └── unified-header.tsx    # Upravený header
└── app/
    ├── dashboard/              # Uživatelský dashboard
    └── admin/                  # Admin dashboard
```

## 🎨 Hlavní Design Principy

### 1. Barevná Paleta
```css
--primary-gold: #F9D523;       /* Hlavní zlatá */
--gold-dark: #B29819;          /* Tmavší zlatá pro gradienty */
--gold-light: #E6C547;         /* Světlejší zlatá */
--teal-accent: #14B8A6;        /* Teal akcent (sekundární) */
--dark-bg: #151515;            /* Tmavé pozadí */
--dark-card: #1a1a1a;          /* Tmavší karta */
```

### 2. Glass Morphism Effect
Všechny karty používají glass morphism efekt:
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### 3. Hover Efekty
Zlatá transformace při najetí myší:
```css
:hover {
  border-color: #F9D523;
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(249, 213, 35, 0.1);
}
```

## 🔧 Implementace v React Komponentách

### Glass Card Component
```tsx
import React from 'react';
import cn from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gold?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hover = true,
  gold = false 
}) => {
  return (
    <div 
      className={cn(
        'glass-card',
        gold && 'glass-card-gold',
        hover && 'hover:transform hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
};
```

### Unified Button Component
```tsx
import React from 'react';
import cn from 'clsx';

interface UnifiedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'premium' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UnifiedButton: React.FC<UnifiedButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  className
}) => {
  const variantClasses = {
    default: 'unified-button',
    premium: 'premium-button',
    glass: 'glass-button'
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};
```

### Stats Card Component
```tsx
import React from 'react';
import cn from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    positive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  className
}) => {
  return (
    <div className={cn('stats-card', className)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-white/60 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      {change && (
        <div className="flex items-center space-x-2">
          <span className={cn(
            'text-sm',
            change.positive ? 'text-green-400' : 'text-red-400'
          )}>
            {change.positive ? '+' : ''}{change.value}%
          </span>
          <span className="text-white/40 text-sm">tento měsíc</span>
        </div>
      )}
    </div>
  );
};
```

## 📱 Responsive Design

### Mobile Breakpoints
```css
/* Mobile (< 768px) */
@media (max-width: 768px) {
  .glass-card { padding: 1rem; }
  .unified-button { font-size: 0.875rem; }
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .glass-card { padding: 1.5rem; }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
  .glass-card { padding: 2rem; }
}
```

## 🚀 Použití v Dashboard Pages

### User Dashboard (`/dashboard/portfolio`)
```tsx
import { GlassCard } from '@/components/ui/glass-card';
import { UnifiedButton } from '@/components/ui/unified-button';
import { StatsCard } from '@/components/ui/stats-card';
import '@/styles/unified-dashboard.css';

export default function PortfolioDashboard() {
  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Header */}
      <header className="glass-card rounded-none border-b border-white/10 px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <UnifiedButton variant="premium">
            Připojit peněženku
          </UnifiedButton>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
          <StatsCard
            title="Celková hodnota"
            value="$3,153,750"
            change={{ value: 12.5, positive: true }}
            icon={<ChartIcon />}
          />
          {/* Další stats karty... */}
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GlassCard className="lg:col-span-2">
            {/* Chart content */}
          </GlassCard>
          
          <GlassCard gold>
            {/* Activity feed */}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
```

### Admin Dashboard (`/admin`)
```tsx
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Admin specifické styly */}
      <GlassCard className="admin-glass-card">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
          <span className="admin-badge">Super Admin</span>
        </div>
        {/* Admin content */}
      </GlassCard>
    </div>
  );
}
```

## 🔄 Migrace Existujících Komponent

### Před (Starý Design):
```tsx
<div className="bg-[#151515] rounded-lg border border-[#333333] p-6">
  <button className="bg-[#F9D523] text-[#151515] px-4 py-2 rounded">
    Click me
  </button>
</div>
```

### Po (Unified Design):
```tsx
<GlassCard>
  <UnifiedButton variant="premium">
    Click me
  </UnifiedButton>
</GlassCard>
```

## 📊 Progress Bars

### Zlatý Progress Bar
```tsx
<div className="progress-bar">
  <div 
    className="progress-fill" 
    style={{ width: `${progress}%` }}
  />
</div>
```

## 🎭 Animace

### Fade In Animation
```tsx
<div className="animate-fadeIn">
  {/* Content */}
</div>
```

### Staggered Animation
```tsx
<div className="animate-stagger">
  <div>Item 1</div> {/* delay: 0.1s */}
  <div>Item 2</div> {/* delay: 0.2s */}
  <div>Item 3</div> {/* delay: 0.3s */}
</div>
```

## 📝 Form Elements

### Glass Input
```tsx
<input 
  type="text"
  className="input-glass"
  placeholder="Enter value..."
/>
```

### Glass Select
```tsx
<select className="input-glass">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

## 🏷️ Badges

### Gold Badge (Premium)
```tsx
<span className="badge-gold">Premium</span>
```

### Status Badges
```tsx
<span className="badge-success">Active</span>
<span className="badge-warning">Pending</span>
<span className="badge-danger">Inactive</span>
```

## ⚡ Performance Optimalizace

1. **Použití CSS Variables** - jednoduchá změna tématu
2. **Backdrop Filter** - GPU akcelerované efekty
3. **Transform pro animace** - vyhnout se layout thrashing
4. **Will-change** pro očekávané animace

## 🎯 Checklist pro Implementaci

- [ ] Import `unified-dashboard.css` do `globals.css`
- [ ] Nahradit všechny `bg-[#151515]` kartičky za `glass-card`
- [ ] Nahradit tlačítka za `unified-button` komponenty
- [ ] Přidat hover efekty na interaktivní elementy
- [ ] Implementovat zlaté akcenty na důležité elementy
- [ ] Přidat animace při načítání (fadeIn, stagger)
- [ ] Otestovat na mobilních zařízeních
- [ ] Ověřit backdrop-filter podporu v prohlížečích

## 🔍 Příklady Live

1. **Portfolio Dashboard** - `/dashboard/portfolio`
2. **Admin Dashboard** - `/admin`
3. **Projects Page** - `/dashboard/projects`
4. **Marketplace** - `/dashboard/marketplace`
5. **Messages** - `/dashboard/messages`

## 🛠️ Troubleshooting

### Backdrop-filter nefunguje
```css
/* Fallback pro starší prohlížeče */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  /* Fallback bez blur efektu */
}

@supports (backdrop-filter: blur(16px)) {
  .glass-card {
    backdrop-filter: blur(16px);
  }
}
```

### Performance issues
- Omezit počet elementů s backdrop-filter
- Použít `will-change` opatrně
- Lazy loading pro těžké komponenty

## 📚 Další Zdroje

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Glass Morphism Generator](https://glassmorphism.com)
- [Gradient Generator](https://cssgradient.io)

---

**Vytvořeno:** 9.9.2025
**Verze:** 1.0.0
**Autor:** GC Development Team
