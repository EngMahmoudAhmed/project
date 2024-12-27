import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface AuthLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ icon: Icon, title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Icon className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}