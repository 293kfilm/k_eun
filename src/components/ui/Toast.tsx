'use client';

import { useEffect } from 'react';
import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
  show: (message: string, type?: ToastType) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  type: 'info',
  visible: false,
  show: (message: string, type: ToastType = 'info') => {
    set({ message, type, visible: true });
  },
  hide: () => {
    set({ visible: false });
  },
}));

const typeStyles: Record<ToastType, string> = {
  success: 'bg-success',
  error: 'bg-error',
  info: 'bg-accent',
};

export function Toast() {
  const { message, type, visible, hide } = useToastStore();

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(hide, 2000);
    return () => clearTimeout(timer);
  }, [visible, hide]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-toast-in">
      <div
        className={`
          ${typeStyles[type]} text-white px-4 py-2.5 rounded-lg
          text-sm font-medium shadow-lg
        `}
      >
        {message}
      </div>
    </div>
  );
}
