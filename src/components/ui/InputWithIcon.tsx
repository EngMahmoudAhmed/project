import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
}

export function InputWithIcon({ icon: Icon, label, ...props }: InputWithIconProps) {
  return (
    <div className="relative">
      <label htmlFor={props.id} className="sr-only">
        {label}
      </label>
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        {...props}
        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
    </div>
  );
}