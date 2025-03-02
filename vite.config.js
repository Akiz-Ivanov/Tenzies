import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allows connections from other devices
    port: 5173,       // Default Vite port
    strictPort: true, // Ensures the port doesn’t change
    open: false       // Optional: prevent browser auto-open
  }
})