'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-bg-secondary border border-border rounded-xl p-4
        ${hover ? 'hover:border-accent-hover transition-colors' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
