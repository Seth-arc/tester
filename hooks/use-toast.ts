'use client'

import { toast as hotToast } from 'react-hot-toast'

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

function toast({ title, description, variant = 'default' }: ToastProps) {
  if (variant === 'destructive') {
    hotToast.error(description || title || 'Error')
  } else {
    hotToast.success(description || title || 'Success')
  }
}

function useToast() {
  return {
    toast,
    dismiss: hotToast.dismiss
  }
}

export { useToast, toast }