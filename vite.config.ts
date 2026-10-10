import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const STAGING_API =
  'http://api-staging-zoneconnection.179.198.111.97.sslip.io'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const localNest = ['1', 'true'].includes((env.USE_LOCAL_NEST ?? '').toLowerCase())
  const target = (
    localNest
      ? env.API_PROXY_TARGET || 'http://127.0.0.1:3333'
      : STAGING_API
  ).replace(/\/api\/?$/, '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
        },
      },
    },
  }
})
