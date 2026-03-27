import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    globals: true
  },
  staged: {
    '*.{js,ts,jsx,tsx,css}': ['vp run format', 'vp run lint']
  },
});
