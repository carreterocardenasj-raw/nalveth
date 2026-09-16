// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Páginas legales de puro trámite (noindex — ver src/pages/aviso-legal.astro,
// privacidad.astro, cookies.astro): se excluyen también del sitemap para no competir
// innecesariamente con el contenido editorial, sin dejar de ser accesibles desde el footer.
const NOINDEX_PATHS = ['/aviso-legal/', '/privacidad/', '/cookies/'];

export default defineConfig({
  site: 'https://nalveth.com',
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => page.endsWith(path)),
    }),
  ],
  trailingSlash: 'always',
  build: { format: 'directory' },
});
