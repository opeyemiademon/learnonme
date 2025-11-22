import toast from 'react-hot-toast';

// Success notification
export const showSuccess = (title: string, message: string = '') => {
  const content = message ? `${title}: ${message}` : title;
  return toast.success(content, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#fff',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10B981',
    },
  });
};

// Error notification
export const showError = (title: string, message: string = '') => {
  const content = message ? `${title}: ${message}` : title;
  return toast.error(content, {
    duration: 6000, // Longer duration for errors
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#fff',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#EF4444',
    },
  });
};

// Warning notification
export const showWarning = (title: string, message: string = '') => {
  const content = message ? `${title}: ${message}` : title;
  return toast(content, {
    duration: 5000,
    position: 'top-right',
    icon: '⚠️',
    style: {
      background: '#F59E0B',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

// Info notification
export const showInfo = (title: string, message: string = '') => {
  const content = message ? `${title}: ${message}` : title;
  return toast(content, {
    duration: 4000,
    position: 'top-right',
    icon: 'ℹ️',
    style: {
      background: '#3B82F6',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

// Loading notification (returns toast ID for removal)
export const showLoading = (title: string, message: string = 'Please wait...') => {
  const content = message ? `${title}: ${message}` : title;
  return toast.loading(content, {
    position: 'top-right',
    style: {
      background: '#6B7280',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

// Remove notification by ID
export const removeNotification = (id: string) => {
  toast.dismiss(id);
};

// Clear all notifications
export const clearAllNotifications = () => {
  toast.dismiss();
};

// Promise-based notifications (useful for async operations)
export const showPromise = <T,>(promise: Promise<T>, messages: { loading?: string; success?: string; error?: string }) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Error occurred',
    },
    {
      position: 'top-right',
      style: {
        fontWeight: '500',
      },
    }
  );
};
