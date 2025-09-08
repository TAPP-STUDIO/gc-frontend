// Main components index - export all components
export { default as TopBar } from './layout/TopBar';
export { default as Sidebar } from './layout/Sidebar';
export { DashboardCard, DashboardButton, StatCard } from './dashboard';
export { Modal } from './ui/modal';
export { ToastProvider, useToast } from './ui/toast';
export { ErrorBoundary } from './ui/error-boundary';
export { 
  Skeleton, 
  CardSkeleton, 
  TableSkeleton, 
  StatsSkeleton, 
  NFTGridSkeleton,
  NotificationSkeleton,
  ChartSkeleton,
  DashboardSkeleton,
  PageLoader,
  ButtonSpinner,
  ShimmerSkeleton,
  LoadingBar
} from './ui/skeleton';

// Form components
export { 
  FileUpload, 
  ImageUpload, 
  FileUploadWithProgress, 
  AvatarUpload 
} from './ui/file-upload';

// Search components
export { AdvancedSearch, QuickSearch } from './search/AdvancedSearch';

// Chart components
export { 
  PortfolioChart, 
  VolumeChart, 
  AllocationChart, 
  PriceChart, 
  PerformanceChart, 
  RealtimeChart, 
  MiniChart, 
  ChartContainer 
} from './charts';

// Profile components
export { UserProfileModal } from './profile/UserProfileModal';

// Marketplace components
export { CreateListingModal, MakeOfferModal } from './marketplace/CreateListingModal';

// Provider components
export { default as ClientProviders } from './providers/ClientProviders';
export { AppProviders } from './providers/AppProviders';
