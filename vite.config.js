import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './emails/BorrowReceiptEmail.jsx',
      formats: ['cjs'],
      fileName: 'BorrowReceiptEmail',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@react-email/components'],
    },
  },
});
