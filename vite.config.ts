import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const SITE = 'https://openhaus-delta.vercel.app'
const SITEMAP_API =
  'https://api-zoneconnection-backendzoneconnection-0163c0-179-198-111-97.sslip.io'

function sitemapPlugin(tenant: string): Plugin {
  return {
    name: 'openhaus-sitemap',
    apply: 'build',
    async closeBundle() {
      const urls = new Set<string>([`${SITE}/`])
      try {
        const response = await fetch(
          `${SITEMAP_API}/api/publico/empreendimentos/catalogo/${encodeURIComponent(tenant)}`,
        )
        if (response.ok) {
          const data = (await response.json()) as {
            empreendimentos?: { slug?: string }[]
            imoveis?: { slug?: string }[]
          }
          for (const item of [...(data.empreendimentos ?? []), ...(data.imoveis ?? [])]) {
            if (item.slug) urls.add(`${SITE}/imoveis/${item.slug}`)
          }
        }
      } catch {
        // Mantém ao menos a home se o catálogo estiver fora do ar no build.
      }

      const body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...[...urls].map(
          (loc) =>
            `  <url><loc>${loc}</loc><changefreq>daily</changefreq><priority>${loc.endsWith('/') ? '1.0' : '0.8'}</priority></url>`,
        ),
        '</urlset>',
        '',
      ].join('\n')

      await writeFile(resolve('dist/sitemap.xml'), body, 'utf8')
      await writeFile(
        resolve('dist/robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
        'utf8',
      )
    },
  }
}

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
    plugins: [react(), tailwindcss(), sitemapPlugin(env.VITE_TENANT_SLUG || 'open-haus')],
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
