import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: parseInt(process.env.PORT || '5173'),
    allowedHosts: [
          'a386e6ed-fdae-471c-b978-3b3cf9fe9878-00-3quosocnsdn4m.janeway.replit.dev'
        ]
  }
});