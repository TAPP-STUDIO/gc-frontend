import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number, 
  currency: string = '$',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency === '$' ? 'USD' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value).replace('$', '') + ' $';
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(
  date: Date | string,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  const d = new Date(date);
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString('cs-CZ');
    case 'long':
      return d.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'relative':
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - d.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'včera';
      if (diffDays < 7) return `před ${diffDays} dny`;
      if (diffDays < 30) return `před ${Math.ceil(diffDays / 7)} týdny`;
      return d.toLocaleDateString('cs-CZ');
    default:
      return d.toLocaleDateString('cs-CZ');
  }
}