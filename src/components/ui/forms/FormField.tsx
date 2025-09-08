'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'file' | 'checkbox' | 'radio';
  placeholder?: string;
  value?: string | number | boolean;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  validation?: string; // 'required|email|min:8|max:50'
  options?: Array<{ value: string | number; label: string }>; // pro select/radio
  accept?: string; // pro file input
  rows?: number; // pro textarea
  hint?: string;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  autoComplete?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
  validation,
  options = [],
  accept,
  rows = 3,
  hint,
  icon,
  prefix,
  suffix,
  autoComplete
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked 
                    : type === 'number' ? parseFloat(e.target.value) || 0
                    : e.target.value;
    
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  const validateField = (val: any): string | null => {
    if (!validation) return null;
    
    const rules = validation.split('|');
    for (const rule of rules) {
      if (rule === 'required' && (!val || val === '')) {
        return `${label} is required`;
      }
      if (rule === 'email' && val && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)) {
        return 'Please enter a valid email address';
      }
      if (rule.startsWith('min:')) {
        const min = parseInt(rule.split(':')[1]);
        if (val && val.toString().length < min) {
          return `${label} must be at least ${min} characters`;
        }
      }
      if (rule.startsWith('max:')) {
        const max = parseInt(rule.split(':')[1]);
        if (val && val.toString().length > max) {
          return `${label} must be no more than ${max} characters`;
        }
      }
    }
    return null;
  };

  const validationError = touched ? validateField(internalValue) : null;
  const displayError = error || validationError;
  const isValid = !displayError && touched && internalValue;

  const baseInputStyles = `
    w-full px-4 py-3 rounded-lg transition-all duration-300
    bg-white/5 border backdrop-blur-md
    text-white placeholder-white/50
    focus:outline-none focus:ring-2
    ${displayError ? 'border-red-500 focus:ring-red-500/30' : 
      isValid ? 'border-green-500 focus:ring-green-500/30' :
      'border-white/20 focus:border-red-400 focus:ring-red-400/30'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${prefix || suffix || icon ? 'pl-10' : ''}
    ${type === 'password' ? 'pr-10' : ''}
  `;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            value={internalValue as string}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            className={baseInputStyles}
            autoComplete={autoComplete}
          />
        );

      case 'select':
        return (
          <select
            value={internalValue as string}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            className={baseInputStyles}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#151515] text-white">
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={internalValue as boolean}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              className="w-5 h-5 rounded border-white/30 bg-white/5 text-red-500 focus:ring-red-400 focus:ring-offset-0"
            />
            <span className="text-white">{label}</span>
          </label>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={label.replace(/\s+/g, '_').toLowerCase()}
                  value={option.value}
                  checked={internalValue === option.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={disabled}
                  className="w-4 h-4 border-white/30 bg-white/5 text-red-500 focus:ring-red-400 focus:ring-offset-0"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            accept={accept}
            className={`${baseInputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-500 file:text-white hover:file:bg-red-600`}
          />
        );

      default:
        return (
          <input
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            value={internalValue as string | number}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={baseInputStyles}
            autoComplete={autoComplete}
          />
        );
    }
  };

  if (type === 'checkbox' || type === 'radio') {
    return (
      <div className={`space-y-2 ${className}`}>
        {renderInput()}
        {displayError && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{displayError}</span>
          </div>
        )}
        {hint && !displayError && (
          <p className="text-white/60 text-sm">{hint}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-white/80 text-sm font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {/* Prefix/Icon */}
        {(icon || prefix) && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon || <span className="text-white/60 text-sm">{prefix}</span>}
          </div>
        )}

        {renderInput()}

        {/* Suffix/Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
            )}
          </button>
        )}

        {suffix && type !== 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-white/60 text-sm">{suffix}</span>
          </div>
        )}

        {/* Validation Icons */}
        {isValid && type !== 'password' && !suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Check className="h-5 w-5 text-green-500" />
          </div>
        )}

        {displayError && type !== 'password' && !suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <X className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="flex items-center space-x-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{displayError}</span>
        </div>
      )}

      {/* Hint */}
      {hint && !displayError && (
        <p className="text-white/60 text-sm">{hint}</p>
      )}
    </div>
  );
};
