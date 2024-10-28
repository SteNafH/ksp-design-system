import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
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
});
