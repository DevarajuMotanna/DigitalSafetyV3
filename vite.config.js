import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    }
  },
  watch: {
    include: ['src/**/*'],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components/': './src/components/',
      '@pages/': './src/pages/',
      '@assets/': './src/assets/',
    },
  },
})
