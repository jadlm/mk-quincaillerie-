import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const origin = (process.env.SITE_URL || 'https://mkquincaillerie.ma').replace(/\/$/, '')
const products = JSON.parse(readFileSync(resolve(root, 'src/data/products.json'), 'utf8'))
const routes = [
  '/', '/produits', '/categories', '/devis', '/a-propos', '/contact', '/mentions-legales',
  ...products.map((product) => `/produits/${product.slug}`),
]
const urls = routes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
const publicDir = resolve(root, 'public')
mkdirSync(publicDir, { recursive: true })
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(resolve(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)

const distDir = resolve(root, 'dist')
mkdirSync(distDir, { recursive: true })
writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap)
writeFileSync(resolve(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)