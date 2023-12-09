/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [nxViteTsPaths()],
  test: {
    typecheck: {
      ignoreSourceErrors: false,
    },
    cache: {
      dir: '../../node_modules/.vitest',
    },
  },
});
