'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { apiService } from '@/services/api.service';
import Logo from '@/components/logo/logo';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await apiService.forgotPassword(data.email);
      
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Nepodařilo se odeslat reset hesla');
      }
    } catch {
      setError('Nastala neočekávaná chyba. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Email odeslán!
              </h2>
              <p className="text-[#666666] mb-6">
                Pokud účet s touto emailovou adresou existuje, obdržíte instrukce pro reset hesla.
              </p>
              <Link
                href="/auth/admin-login"
                className="inline-flex items-center space-x-2 text-sm text-red-500 hover:text-red-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zpět na přihlášení</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background animation */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Zapomenuté heslo
          </h2>
          <p className="text-[#666666] text-sm">
            Zadejte svůj email a my vám pošleme instrukce pro reset hesla
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#666666]" />
              </div>
              <input
                {...register('email', {
                  required: 'Email je povinný',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Neplatný email',
                  },
                })}
                type="email"
                autoComplete="email"
                className={`
                  block w-full pl-10 pr-3 py-3 
                  bg-[#151515] border rounded-lg
                  text-white placeholder-[#666666]
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition-colors
                  ${errors.email ? 'border-red-500' : 'border-[#333333]'}
                `}
                placeholder="admin@gavlikcapital.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full flex justify-center items-center space-x-2
              py-3 px-4 rounded-lg font-medium
              text-white bg-red-500 hover:bg-red-600
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              transition-all duration-200
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Odesílání...</span>
              </>
            ) : (
              <span>Odeslat reset hesla</span>
            )}
          </button>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/auth/admin-login"
              className="inline-flex items-center space-x-2 text-sm text-[#666666] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zpět na přihlášení</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
