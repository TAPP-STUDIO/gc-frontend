import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/lib/types';

interface InputProps extends BaseProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  label,
  placeholder,
  error,
  icon,
  iconPosition = 'left',
  disabled = false,
  required = false,
  className,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const hasError = !!error;
  
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-white mb-2">
          {label}
          {required && <span className="text-[#EF4444] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-[#666666]">{icon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={cn(
            'block w-full px-3 py-2 bg-[#1a1a1a] border rounded-lg text-white placeholder-[#666666] transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[#F9D523] focus:border-[#F9D523]',
            // Icon spacing
            icon && iconPosition === 'left' && 'pl-10',
            icon && iconPosition === 'right' && 'pr-10',
            // Error state
            hasError
              ? 'border-[#EF4444] focus:ring-[#EF4444] focus:border-[#EF4444]'
              : 'border-[#333333] hover:border-[#555555]',
            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed bg-[#0f0f0f]'
          )}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-[#666666]">{icon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-[#EF4444]">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';