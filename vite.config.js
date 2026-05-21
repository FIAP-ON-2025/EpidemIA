import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/EpidemIA/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
