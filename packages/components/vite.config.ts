import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

function ensureImportFileExtension(content: string, extension: string) {
  // replace e.g. `import { foo } from './foo'` with `import { foo } from './foo.js'`
  content = content.replace(
    /(im|ex)port\s[\w{}/*\s,]+from\s['"]\.\.?\/[^.'"]+(?=['"];?)/gm,
    `$&.${extension}`,
  );

  // replace e.g. `import('./foo')` with `import('./foo.js')`
  content = content.replace(
    /import\(['"]\.\.?\/[^.'"]+(?=['"];?)/gm,
    `$&.${extension}`,
  );
  return content;
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      outDir: 'dist/es',
      entryRoot: './src',
      include: './src',
      compilerOptions: {
        module: 99, // ESNext
        declarationMap: false,
      },
      beforeWriteFile: (filePath, content) => ({
        filePath,
        content: ensureImportFileExtension(content, 'js'),
      }),
      afterDiagnostic: (diagnostics) => {
        if (diagnostics.length > 0) {
          console.error('Please fix the above type errors');
          process.exit(1);
        }
      },
    }),
    dts({
      outDir: 'dist/cjs',
      entryRoot: './src',
      include: './src',
      compilerOptions: {
        module: 1, // CommonJS
        declarationMap: false,
      },
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('.d.ts', '.d.cts'),
        content: ensureImportFileExtension(content, 'cjs'),
      }),
      afterDiagnostic: (diagnostics) => {
        if (diagnostics.length > 0) {
          console.error('Please fix the above type errors');
          process.exit(1);
        }
      },
    }),
  ] as UserConfig['plugins'],
  define: {
    'process.env.NODE_ENV': `"${mode}"`,
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: ['./src/index.ts'],
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'cjs') return 'cjs/[name].cjs';
        return 'es/[name].js';
      },
    },
    rollupOptions: {
      external: ['react'],
      output: {
        chunkFileNames: '[format]/[name]-[hash].js',
      },
    },
  },
  test: {
    name: packageJson.name,
    dir: './tests',
    watch: false,
    environment: 'jsdom',
    setupFiles: ['./tests/test-setup.ts'],
    coverage: { enabled: true, provider: 'istanbul', include: ['src/**/*'] },
    typecheck: { enabled: true },
  },
}));
