'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/logo/logo';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Check, X } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character type checks
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  // Map score to strength
  if (score <= 2) return { score: 1, label: 'Slabé', color: 'bg-red-500' };
  if (score <= 4) return { score: 2, label: 'Střední', color: 'bg-yellow-500' };
  if (score <= 5) return { score: 3, label: 'Silné', color: 'bg-green-500' };
  return { score: 4, label: 'Velmi silné', color: 'bg-green-600' };
}

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requiresNewPassword, setRequiresNewPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, label: '', color: '' });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();
  const { login, completeNewPassword, isAuthenticated, isInAdminGroup } = useAuth();
  
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
  
  // Update password strength when password changes
  useEffect(() => {
    if (newPassword) {
      setPasswordStrength(calculatePasswordStrength(newPassword));
    } else {
      setPasswordStrength({ score: 0, label: '', color: '' });
    }
  }, [newPassword]);
  
  // Check if passwords match
  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [newPassword, confirmPassword]);

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsSubmitting(true);
    setLoginEmail(data.email);
    setLoginPassword(data.password);

    try {
      const result = await login(data.email, data.password);
      
      console.log('Login result:', result); // Debug log
      
      if (result.requiresNewPassword || result.error === 'NEW_PASSWORD_REQUIRED') {
        // User needs to set a new password
        console.log('NEW_PASSWORD_REQUIRED detected'); // Debug log
        setRequiresNewPassword(true);
        setError(null);
      } else if (!result.success) {
        setError(result.error || 'Přihlášení selhalo');
      }
      // If successful, the AuthContext will handle the redirect
    } catch (err) {
      console.error('Login error:', err);
      setError('Nastala neočekávaná chyba. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate passwords
    if (!newPassword || !confirmPassword) {
      setError('Vyplňte obě pole s heslem.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Hesla se neshodují.');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Heslo musí mít alespoň 8 znaků.');
      return;
    }
    
    if (passwordStrength.score < 2) {
      setError('Heslo je příliš slabé. Použijte kombinaci velkých a malých písmen, čísel a speciálních znaků.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      console.log('Calling completeNewPassword with:', { email: loginEmail, password: loginPassword });
      const result = await completeNewPassword(loginEmail, loginPassword, newPassword);
      
      console.log('CompleteNewPassword result:', result);
      
      if (!result.success) {
        setError(result.error || 'Nepodařilo se nastavit nové heslo.');
      }
      // If successful, the AuthContext will handle the redirect
    } catch (err) {
      console.error('Complete new password error:', err);
      setError('Nastala neočekávaná chyba. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (requiresNewPassword) {
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
              Nastavení nového hesla
            </h2>
            <p className="text-sm text-red-400 mb-4">
              Musíte si nastavit nové heslo, než se můžete přihlásit.
            </p>
          </div>

          {/* New Password Form */}
          <form onSubmit={handleNewPasswordSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-2">
                  Nové heslo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#666666]" />
                  </div>
                  <input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`
                      block w-full pl-10 pr-10 py-3 
                      bg-[#151515] border rounded-lg
                      text-white placeholder-[#666666]
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                      transition-colors
                      ${error ? 'border-red-500' : 'border-[#333333]'}
                    `}
                    placeholder="••••••••"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5 text-[#666666] hover:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#666666] hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#666666]">Síla hesla:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength.score === 1 ? 'text-red-500' :
                        passwordStrength.score === 2 ? 'text-yellow-500' :
                        passwordStrength.score === 3 ? 'text-green-500' :
                        'text-green-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    {newPassword.length >= 8 ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-[#666666]" />
                    )}
                    <span className={`text-xs ${newPassword.length >= 8 ? 'text-green-500' : 'text-[#666666]'}`}>
                      Minimálně 8 znaků
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-[#666666]" />
                    )}
                    <span className={`text-xs ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'text-green-500' : 'text-[#666666]'}`}>
                      Velká a malá písmena
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/[0-9]/.test(newPassword) ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-[#666666]" />
                    )}
                    <span className={`text-xs ${/[0-9]/.test(newPassword) ? 'text-green-500' : 'text-[#666666]'}`}>
                      Alespoň jedno číslo
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/[^a-zA-Z0-9]/.test(newPassword) ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-[#666666]" />
                    )}
                    <span className={`text-xs ${/[^a-zA-Z0-9]/.test(newPassword) ? 'text-green-500' : 'text-[#666666]'}`}>
                      Speciální znak (!@#$%^&*)
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Potvrdit nové heslo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#666666]" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`
                      block w-full pl-10 pr-10 py-3 
                      bg-[#151515] border rounded-lg
                      text-white placeholder-[#666666]
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                      transition-colors
                      ${!passwordsMatch && confirmPassword ? 'border-red-500' : 'border-[#333333]'}
                    `}
                    placeholder="••••••••"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-[#666666] hover:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#666666] hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-1 text-sm text-red-400">Hesla se neshodují</p>
                )}
                {confirmPassword && passwordsMatch && newPassword === confirmPassword && (
                  <p className="mt-1 text-sm text-green-500">Hesla se shodují</p>
                )}
              </div>
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
                  <span>Nastavuji nové heslo...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Nastavit nové heslo</span>
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
