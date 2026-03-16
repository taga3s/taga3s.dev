import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,jsx,tsx,css}': ['vp run format', 'vp run lint']
  },
});
