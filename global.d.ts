// Global type declarations

// Google Analytics gtag
declare global {
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
}

export {};
