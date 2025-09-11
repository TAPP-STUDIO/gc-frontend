// Google Analytics gtag type definitions
interface Window {
  gtag?: (
    command: 'config' | 'event' | 'set' | 'consent',
    targetId: string,
    config?: {
      description?: string;
      fatal?: boolean;
      [key: string]: unknown;
    }
  ) => void;
}
