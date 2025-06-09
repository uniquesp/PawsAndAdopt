import { Toaster } from 'sonner';

export function SonnerToast() {
  return (
    <Toaster 
      position="top-right"
      richColors
      toastOptions={{
        style: {
          background: '#E4D3E7',
          color: '#FFFEFE',
          border: `1px solid #8A5691`,
        },
        className: 'custom-toast',
      }}
    />
  );
}