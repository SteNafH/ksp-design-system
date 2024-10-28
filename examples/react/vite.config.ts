import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()] as UserConfig['plugins'],
  define: {
    'process.env.NODE_ENV': `"${mode}"`,
  },
}));
