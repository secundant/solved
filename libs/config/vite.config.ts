/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [nxViteTsPaths()],
  test: {
    cache: {
      dir: resolve(__dirname, '../../node_modules/.vitest'),
    },
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
