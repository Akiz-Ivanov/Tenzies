import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/Akiz-Ivanov/Tenzies.git', // Replace with your repository name
});
