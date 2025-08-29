'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { apiService } from '@/services/api.service';
import Logo from '@/components/logo/logo';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface ForgotPasswordForm {
  email: string;
}

interface ResetPasswordForm {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'code' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailForm = useForm<ForgotPasswordForm>();
  const resetForm = useForm<ResetPasswordForm>();

  const handleEmailSubmit = async (data: ForgotPasswordForm) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await apiService.forgotPassword(data.email);
      
      if (response.success) {
        setEmail(data.email);
        setStep('code');
      } else {
        setError(response.error || 'Nepodařilo se odeslat reset email');
      }
    } catch (err: any) {
      setError('Nastala neočekávaná chyba. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (data: ResetPasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('Hesla se neshodují');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await apiService.resetPassword(email, data.code, data.newPassword);
      
      if (response.success) {
        setStep('success');
      } else {
        setError(response.error || 'Nepodařilo se resetovat heslo');
      }
    } catch (err: any) {
      setError('Nastala neočekávaná chyba. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="flex items-center space-x-3">
              <Logo />
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded uppercase">
                ADMIN
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {step === 'email' && 'Zapomenuté heslo'}
            {step === 'code' && 'Reset hesla'}
            {step === 'success' && 'Heslo resetováno'}
          </h2>
          <p className="text-[#666666] text-sm">
            {step === 'email' && 'Zadejte váš email pro reset hesla'}
            {step === 'code' && 'Zadejte kód z emailu a nové heslo'}
            {step === 'success' && 'Vaše heslo bylo úspěšně změněno'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Email Step */}
        {step === 'email' && (
          <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#666666]" />
                </div>
                <input
                  {...emailForm.register('email', {
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
                    ${emailForm.formState.errors.email ? 'border-red-500' : 'border-[#333333]'}
                  `}
                  placeholder="admin@gavlikcapital.com"
                />
              </div>
              {emailForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-400">{emailForm.formState.errors.email.message}</p>
              )}
            </div>

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
                <span>Odeslat reset email</span>
              )}
            </button>
          </form>
        )}

        {/* Code Step */}
        {step === 'code' && (
          <form onSubmit={resetForm.handleSubmit(handleResetSubmit)} className="mt-8 space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-white mb-2">
                Ověřovací kód
              </label>
              <input
                {...resetForm.register('code', {
                  required: 'Kód je povinný',
                })}
                type="text"
                className={`
                  block w-full px-3 py-3 
                  bg-[#151515] border rounded-lg
                  text-white placeholder-[#666666]
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition-colors
                  ${resetForm.formState.errors.code ? 'border-red-500' : 'border-[#333333]'}
                `}
                placeholder="123456"
              />
              {resetForm.formState.errors.code && (
                <p className="mt-1 text-sm text-red-400">{resetForm.formState.errors.code.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-2">
                Nové heslo
              </label>
              <input
                {...resetForm.register('newPassword', {
                  required: 'Heslo je povinné',
                  minLength: {
                    value: 8,
                    message: 'Heslo musí mít alespoň 8 znaků',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: 'Heslo musí obsahovat velké, malé písmeno, číslo a speciální znak',
                  },
                })}
                type="password"
                className={`
                  block w-full px-3 py-3 
                  bg-[#151515] border rounded-lg
                  text-white placeholder-[#666666]
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition-colors
                  ${resetForm.formState.errors.newPassword ? 'border-red-500' : 'border-[#333333]'}
                `}
                placeholder="••••••••"
              />
              {resetForm.formState.errors.newPassword && (
                <p className="mt-1 text-sm text-red-400">{resetForm.formState.errors.newPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Potvrdit heslo
              </label>
              <input
                {...resetForm.register('confirmPassword', {
                  required: 'Potvrzení hesla je povinné',
                })}
                type="password"
                className={`
                  block w-full px-3 py-3 
                  bg-[#151515] border rounded-lg
                  text-white placeholder-[#666666]
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition-colors
                  ${resetForm.formState.errors.confirmPassword ? 'border-red-500' : 'border-[#333333]'}
                `}
                placeholder="••••••••"
              />
              {resetForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{resetForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

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
                  <span>Resetování...</span>
                </>
              ) : (
                <span>Resetovat heslo</span>
              )}
            </button>
          </form>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <p className="text-white">
              Vaše heslo bylo úspěšně změněno. Nyní se můžete přihlásit s novým heslem.
            </p>

            <Link
              href="/admin/login"
              className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              <span>Přejít na přihlášení</span>
            </Link>
          </div>
        )}

        {/* Back to Login Link */}
        {step !== 'success' && (
          <div className="text-center">
            <Link
              href="/admin/login"
              className="inline-flex items-center space-x-2 text-sm text-[#666666] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zpět na přihlášení</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
