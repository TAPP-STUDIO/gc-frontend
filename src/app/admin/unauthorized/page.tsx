'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldOff, ArrowLeft, Mail } from 'lucide-react';
import Logo from '@/components/logo/logo';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background animation */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded uppercase">
              ADMIN
            </span>
          </div>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
            <ShieldOff className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">
            Přístup odepřen
          </h1>
          <p className="text-[#666666]">
            Nemáte oprávnění k přístupu do admin sekce.
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
            <p className="text-sm text-red-400">
              Pro přístup musíte být členem skupiny <span className="font-semibold">gc_super_admins</span> v AWS Cognito.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4 pt-6">
          <button
            onClick={() => router.back()}
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg font-medium text-white bg-[#333333] hover:bg-[#444444] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zpět</span>
          </button>

          <Link
            href="/dashboard"
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg font-medium text-white bg-[#151515] hover:bg-[#1a1a1a] border border-[#333333] transition-colors"
          >
            <span>Přejít na User Dashboard</span>
          </Link>
        </div>

        {/* Contact Support */}
        <div className="pt-6 border-t border-[#333333]">
          <p className="text-sm text-[#666666] mb-3">
            Pokud si myslíte, že by vám měl být přístup povolen, kontaktujte:
          </p>
          <a
            href="mailto:support@gavlikcapital.com"
            className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>support@gavlikcapital.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
