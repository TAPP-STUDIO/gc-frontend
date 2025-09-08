'use client';

import React, { useEffect, useRef } from 'react';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { ButtonLoading } from './loading';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
  closeOnBackdrop = true,
  showCloseButton = true
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`
          relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden
          bg-gradient-to-br from-[#1a1a1a]/95 to-[#0a0a0a]/95
          border border-white/20 rounded-2xl shadow-2xl
          backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-300
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/60 hover:text-white" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false
}) => {
  const icons = {
    danger: <AlertTriangle className="w-6 h-6 text-red-500" />,
    warning: <AlertCircle className="w-6 h-6 text-yellow-500" />,
    info: <Info className="w-6 h-6 text-blue-500" />,
    success: <CheckCircle className="w-6 h-6 text-green-500" />
  };

  const confirmButtonClasses = {
    danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500',
    info: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
    success: 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
  };

  const handleConfirm = async () => {
    await onConfirm();
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" closeOnBackdrop={!isLoading}>
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            {icons[type]}
          </div>
          <div className="flex-1">
            <p className="text-white/80 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <ButtonLoading
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${confirmButtonClasses[type]}`}
          >
            {confirmText}
          </ButtonLoading>
        </div>
      </div>
    </Modal>
  );
};

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>;
  tabs?: Array<{ key: string; label: string; content: React.ReactNode }>;
  actions?: React.ReactNode;
  className?: string;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  title,
  data,
  tabs,
  actions,
  className = ''
}) => {
  const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.key || '');

  useEffect(() => {
    if (tabs && tabs.length > 0) {
      setActiveTab(tabs[0].key);
    }
  }, [tabs]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg" className={className}>
      <div className="flex flex-col h-full">
        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <div className="flex border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-red-500 border-b-2 border-red-500 bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6">
          {tabs && tabs.length > 0 ? (
            tabs.find(tab => tab.key === activeTab)?.content
          ) : (
            <div className="space-y-4">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <span className="text-white font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="p-6 border-t border-white/10">
            {actions}
          </div>
        )}
      </div>
    </Modal>
  );
};

interface SlideoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Slideout: React.FC<SlideoutProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  size = 'md',
  className = ''
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[32rem]'
  };

  const slideClasses = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`absolute inset-y-0 ${side}-0 flex`}>
        <div
          className={`
            ${sizeClasses[size]} bg-gradient-to-br from-[#1a1a1a]/95 to-[#0a0a0a]/95
            border-${side === 'left' ? 'r' : 'l'} border-white/20 shadow-2xl
            backdrop-blur-xl transform transition-transform duration-300 ease-in-out
            ${slideClasses[side]} ${className}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/60 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
