import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()] as UserConfig['plugins'],
  define: {
    'process.env.NODE_ENV': `"${mode}"`,
  },
  resolve: {
    alias: [
      {
        find: /^\/?@stenafh\/ksp-components$/,
        replacement: fileURLToPath(
          import.meta.resolve('@stenafh/ksp-components'),
        ),
      },
    ],
  },
}));
