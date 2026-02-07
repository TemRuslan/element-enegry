import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, 'data', 'blog.json');
const BLOG_DATA_JS_PATH = path.join(ROOT, 'js', 'blog_data.js');
const OUT_DIR = path.join(ROOT, 'blog');

const htmlEscape = (s) =>
  String(s == null ? '' : s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const normalizeItems = (json) => {
  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.items)) return json.items;
  throw new Error('data/blog.json must be an array or { items: [...] }.');
};

const render = (item) => {
  const title = item.title || 'Статья';
  const pageTitle = `${title} | Блог | Элемент Энергия`;
  const metaDescription =
    item.metaDescription ||
    item.excerpt ||
    'Технические статьи о газопоршневых установках: выбор мощности, проектирование, ПНР, сервис и эксплуатация 24/7.';

  return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${htmlEscape(metaDescription)}" />
    <title>${htmlEscape(pageTitle)}</title>

    <script>
      (function () {
        var p = String(location.pathname || '');
        if (location.protocol === 'file:') {
          var marker = '/gkee.ru/';
          var idx = p.lastIndexOf(marker);
          if (idx >= 0) p = p.slice(idx + marker.length);
        }
        p = p.replace(/^\\/+/, '');
        if (!p.endsWith('/')) p = p.replace(/[^/]*$/, '');
        var depth = p.split('/').filter(Boolean).length;
        var prefix = depth ? Array(depth + 1).join('../') : './';
        document.write('<base href="' + prefix + '">');
      })();
    </script>

    <script>
      window.tailwind = window.tailwind || {};
      window.tailwind.config = {
        theme: {
          extend: {
            colors: {
              accent: '#0ea5e9',
              'accent-dark': '#0284c7',
            }
          }
        }
      };
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@700&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png" />
    <link rel="stylesheet" href="css/styles.css" />
  </head>

  <body class="projects-page blog-article-page" data-article="${htmlEscape(item.slug)}">
    <div id="header-placeholder"></div>

	    <div class="page-light">
	      <div class="bg-blob blob-1"></div>
	      <div class="bg-blob blob-2"></div>

	      <main class="pb-24">
	        <div id="articleStream"></div>
	      </main>

      <div id="footer-placeholder"></div>
    </div>

    <script src="js/blog_data.js"></script>
    <script src="js/blog_stream.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>
`;
};

const main = async () => {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  const json = JSON.parse(raw);
  const items = normalizeItems(json);

  const seen = new Set();
  for (const item of items) {
    const missing = [];
    if (!item.slug) missing.push('slug');
    if (!item.title) missing.push('title');
    if (!item.category) missing.push('category');
    if (!item.isoDate) missing.push('isoDate');
    if (!item.date) missing.push('date');
    if (!item.excerpt) missing.push('excerpt');
    if (!item.image) missing.push('image');
    if (!item.imageAlt) missing.push('imageAlt');
    if (!item.tags || !Array.isArray(item.tags) || item.tags.length === 0) missing.push('tags');
    if (!item.metaDescription) missing.push('metaDescription');
    if (!item.blocks || !Array.isArray(item.blocks) || item.blocks.length === 0) missing.push('blocks');

    if (missing.length) {
      throw new Error(`Item "${item.slug || '(no slug)'}" missing fields: ${missing.join(', ')}`);
    }
    if (seen.has(item.slug)) throw new Error(`Duplicate slug: ${item.slug}`);
    seen.add(item.slug);
  }

  // Sorting used by the infinite stream: newest first, then stable by slug.
  const sorted = [...items].sort((a, b) => {
    const ad = String(a.isoDate || '');
    const bd = String(b.isoDate || '');
    if (bd !== ad) return bd.localeCompare(ad);
    return String(a.slug || '').localeCompare(String(b.slug || ''));
  });

  const js = `// Auto-generated from data/blog.json by scripts/generate_blog_pages.mjs\n// Used by js/blog_stream.js and js/blog_list.js\nwindow.blogArticles = ${JSON.stringify(sorted, null, 2)};\n`;
  await fs.writeFile(BLOG_DATA_JS_PATH, js, 'utf8');

  await fs.mkdir(OUT_DIR, { recursive: true });
  await Promise.all(
    items.map(async (item) => {
      const outPath = path.join(OUT_DIR, `${item.slug}.html`);
      await fs.writeFile(outPath, render(item), 'utf8');
    })
  );

  const manifest = items.map((i) => ({ slug: i.slug, page: `blog/${i.slug}.html` }));
  await fs.writeFile(
    path.join(ROOT, 'data', 'blog.manifest.json'),
    JSON.stringify({ version: 1, items: manifest }, null, 2) + '\n',
    'utf8'
  );
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
