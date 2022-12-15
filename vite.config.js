import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /*server: {
    port: 2013,
    host: "128.199.2.102"
  },
  define: {
    global: {}
  },*/
  define: {
    global: {}
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  optimizeDeps: {
    include: [
        '@apollo/client/core',
        '@apollo/client/cache'
    ]
  },
  rollupInputOptions: {
    external: ['react']
  }
})
