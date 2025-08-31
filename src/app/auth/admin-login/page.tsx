'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/logo/logo';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Shield } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login, isAuthenticated, isInAdminGroup } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && isInAdminGroup) {
      router.push('/admin');
    }
  }, [isAuthenticated, isInAdminGroup, router]);

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await login(data.email, data.password);
      
      if (!result.success) {
        setError(result.error || 'Přihlášení selhalo');
      }
    } catch {
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
            Admin Dashboard
          </h2>
          <p className="text-[#666666] text-sm">
            Přístup pouze pro členy skupiny <span className="text-red-500 font-semibold">gc_super_admins</span>
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 bg-red-500/10 border border-red-500/30 rounded-lg py-3 px-4">
          <Shield className="w-5 h-5 text-red-500" />
          <span className="text-sm text-white">
            Zabezpečené AWS Cognito autentizací
          </span>
        </div>

        {/* Login Form */}
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

          <div className="space-y-4">
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Heslo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#666666]" />
                </div>
                <input
                  {...register('password', {
                    required: 'Heslo je povinné',
                    minLength: {
                      value: 8,
                      message: 'Heslo musí mít alespoň 8 znaků',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`
                    block w-full pl-10 pr-10 py-3 
                    bg-[#151515] border rounded-lg
                    text-white placeholder-[#666666]
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                    transition-colors
                    ${errors.password ? 'border-red-500' : 'border-[#333333]'}
                  `}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#666666] hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#666666] hover:text-white transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#666666] hover:text-red-500 transition-colors"
            >
              Zapomněli jste heslo?
            </Link>
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
                <span>Přihlašování...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Přihlásit se</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="text-center space-y-2">
          <p className="text-xs text-[#666666]">
            Přístup je omezen pouze pro autorizované administrátory
          </p>
          <p className="text-xs text-[#666666]">
            V případě problémů kontaktujte{' '}
            <a href="mailto:support@gavlikcapital.com" className="text-red-500 hover:underline">
              support@gavlikcapital.com
            </a>
          </p>
        </div>

        {/* Back to Main Site */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-sm text-[#666666] hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Zpět na hlavní stránku</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
