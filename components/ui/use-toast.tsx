// components/ui/use-toast.tsx
import { toast as baseToast, ToastOptions } from 'react-hot-toast';

interface ToastProps {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

export const toast = ({ title, description, type = 'success' }: ToastProps) => {
  const options: ToastOptions = {
    position: 'top-right',
    style: {
      borderRadius: '8px',
      background: type === 'error' ? '#ff4d4f' : '#4caf50',
      color: '#fff',
      padding: '16px',
    },
    duration: 4000,
  };

  switch (type) {
    case 'success':
      baseToast.success(`${title}: ${description || ''}`, options);
      break;
    case 'error':
      baseToast.error(`${title}: ${description || ''}`, options);
      break;
    case 'info':
      baseToast(`${title}: ${description || ''}`, options);
      break;
    default:
      baseToast(`${title}: ${description || ''}`, options);
  }
};
