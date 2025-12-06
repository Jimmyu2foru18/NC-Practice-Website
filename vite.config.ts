import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    // Use relative base path so it adapts to whatever the repo name is on GitHub Pages
    base: './', 
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});