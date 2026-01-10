import { useState, useCallback } from 'react';
import { Toast } from '../components/Toast';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 5000) => {
      const id = `toast-${Date.now()}`;
      const newToast: Toast = { id, message, type, duration };
      setToasts((prev) => [...prev, newToast]);

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    info: (message: string) => showToast(message, 'info'),
    warning: (message: string) => showToast(message, 'warning'),
  };
}
