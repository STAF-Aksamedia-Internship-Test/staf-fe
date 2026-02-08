import React from 'react';

export default function LoadingSpinner({ size = 'md', text = 'Memuat...' }) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const gaps = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
  };

  const animations = {
    sm: '[animation-delay:-0.45s]',
    md: '[animation-delay:-0.3s]',
    lg: '[animation-delay:-0.15s]',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className={`flex ${gaps[size]}`}>
        <div className={`${sizes[size]} bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.6s]`} />
        <div className={`${sizes[size]} bg-indigo-500 rounded-full animate-bounce ${animations[size]}`} />
        <div className={`${sizes[size]} bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]`} />
      </div>
      {text && <span className="text-gray-500 dark:text-gray-400 text-sm">{text}</span>}
    </div>
  );
}

export function TableLoading({ columns }) {
  return (
    <tr>
      <td colSpan={columns} className="px-6 py-8 text-center">
        <LoadingSpinner />
      </td>
    </tr>
  );
}

export function FullPageLoading({ text = 'Memuat...' }) {
  return (
    <div className="fixed inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center gap-2 py-8">
      {Icon && <Icon className="w-12 h-12 text-gray-300 dark:text-gray-600" />}
      <span className="text-gray-500 dark:text-gray-400">{title}</span>
      {description && <p className="text-sm text-gray-400 dark:text-gray-500">{description}</p>}
    </div>
  );
}
