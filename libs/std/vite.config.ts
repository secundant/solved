/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [nxViteTsPaths()],
  test: {
    passWithNoTests: true,
  },
});
