// ===== CORE UI TYPES =====
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type Status = 'default' | 'success' | 'warning' | 'error' | 'info';

// ===== BASE COMPONENT PROPS =====
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ClickableProps extends BaseProps {
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
}

export interface LoadingProps {
  loading?: boolean;
}

// ===== LAYOUT TYPES =====
export type AlignItems = 'start' | 'center' | 'end' | 'stretch';
export type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexDirection = 'row' | 'column';
export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// ===== FORM TYPES =====
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
export type IconPosition = 'left' | 'right';

// ===== BUSINESS LOGIC TYPES =====

// Portfolio Types
export interface PortfolioItem {
  title: string;
  count: number;
  href: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

// Claim Types
export interface ClaimData {
  id: string;
  project: string;
  amount: number;
  nextClaimDate: string | Date;
  progress: number;
  status: 'available' | 'pending' | 'locked';
  estimatedReward?: number;
  lastClaim?: string | Date;
}

export interface ClaimHistory {
  id: string;
  project: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  hash?: string;
}

// Value Card Types
export interface TrendData {
  value: number;
  direction: 'up' | 'down';
  period?: string;
}

export interface ValueCardAction {
  label: string;
  onClick: () => void;
}

// ===== TABLE TYPES =====
export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
  onSort: (key: keyof T) => void;
}

// ===== API TYPES =====
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
}

// ===== USER TYPES =====
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin?: string;
}

// ===== WALLET & CRYPTO TYPES =====
export interface WalletInfo {
  address: string;
  balance: number;
  currency: string;
  network: string;
}

export interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  blockNumber?: number;
  gasUsed?: number;
}

// ===== PROJECT TYPES =====
export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: 'active' | 'inactive' | 'maintenance';
  totalCards: number;
  totalValue: number;
  lastClaim?: string;
  nextClaim?: string;
  roi: number;
  category: 'nft' | 'defi' | 'trading' | 'mining';
}

// ===== NOTIFICATION TYPES =====
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// ===== SETTINGS TYPES =====
export interface UserSettings {
  theme: 'dark' | 'light';
  language: 'cs' | 'en';
  currency: 'USD' | 'EUR' | 'CZK';
  notifications: {
    email: boolean;
    push: boolean;
    claims: boolean;
    security: boolean;
  };
  privacy: {
    showBalance: boolean;
    showTransactions: boolean;
  };
}

// ===== MODAL TYPES =====
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
}

// ===== UTILITY TYPES =====
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Currency formatter options
export interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  decimals?: number;
}

// Date formatter options
export type DateFormat = 'short' | 'long' | 'relative' | 'time';

// ===== EVENT TYPES =====
export interface CustomEvent<T = unknown> {
  type: string;
  payload: T;
  timestamp: number;
}

// ===== RESPONSIVE TYPES =====
export interface ResponsiveConfig {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

// ===== ANIMATION TYPES =====
export type AnimationDuration = 'fast' | 'normal' | 'slow';
export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce';

// ===== THEME TYPES =====
export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: {
    default: string;
    hover: string;
    focus: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}