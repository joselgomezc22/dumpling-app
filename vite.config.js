import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "global": {},
  },
<<<<<<< HEAD
  server: {
    port: 2013,
    host: "128.199.2.102"
  },
=======
  /*server: {
    port: 2013,
    host: "128.199.2.102"
  },*/
>>>>>>> 4f92c664d2ddce06f066e7c8e7fc00fde91ad9fd
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  }
})
