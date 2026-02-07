import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, 'data', 'projects.json');

const htmlEscape = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

const normalizeItems = (json) => {
  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.items)) return json.items;
  throw new Error('projects.json must be an array or { items: [...] }.');
};

const chip = (text) => {
  if (!text) return '';
  return `<span class="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.18em] bg-white/60 border border-slate-900/10 text-slate-600">${htmlEscape(
    text
  )}</span>`;
};

const render = (item) => {
  const title = item.title || 'Проект';
  const pageTitle = `${title} | Проекты | Элемент Энергия`;
  const metaDescription =
    item.result ||
    'Проект: энергоцентр, поставка, ПНР и сервис. Публичная версия без чувствительной информации.';

  const chips = [
    item.year ? String(item.year) : null,
    item.industry,
    item.region,
    item.mode ? `Режим: ${item.mode}` : null,
    item.ndaLabel,
  ]
    .filter(Boolean)
    .map(chip)
    .join('');

  const imageBlock = item.image
    ? `
        <div class="projects-media relative overflow-hidden border border-slate-900/10 bg-white/40 backdrop-blur-md shadow-[0_28px_80px_rgba(15,23,42,0.10)]">
          <div class="aspect-[16/10] w-full relative">
            <img src="${htmlEscape(item.image)}" alt="${htmlEscape(title)}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
          </div>
        </div>
      `
    : '';

  const params = [
    item.power ? `<div><span class="text-slate-500">Мощность:</span> ${htmlEscape(item.power)}</div>` : '',
    item.units ? `<div><span class="text-slate-500">Агрегаты:</span> ${htmlEscape(item.units)}</div>` : '',
    item.region ? `<div><span class="text-slate-500">Регион:</span> ${htmlEscape(item.region)}</div>` : '',
    item.industry ? `<div><span class="text-slate-500">Отрасль:</span> ${htmlEscape(item.industry)}</div>` : '',
  ]
    .filter(Boolean)
    .join('');

  const scopeItems = toArray(item.scope)
    .filter(Boolean)
    .map((s) => `<li class="text-sm text-slate-600 leading-relaxed">${htmlEscape(s)}</li>`)
    .join('');

  const resultText = item.result ? htmlEscape(item.result) : '';
  const ndaText = item.ndaLabel ? htmlEscape(item.ndaLabel) : '';

  return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${htmlEscape(metaDescription)}" />
    <title>${htmlEscape(pageTitle)}</title>

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

  <body class="projects-page">
    <div id="header-placeholder"></div>

    <div class="page-light">
      <div class="bg-blob blob-1"></div>
      <div class="bg-blob blob-2"></div>

      <section class="pt-14 pb-8">
        <div class="max-w-7xl mx-auto px-6">
          <a href="projects.html" class="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-500 hover:text-accent transition">
            <i class="fa-solid fa-arrow-left"></i>
            Все проекты
          </a>

          <h1 class="mt-6 text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.05]">
            ${htmlEscape(title)}
          </h1>

          <div class="mt-6 flex flex-wrap gap-2">
            ${chips}
          </div>
        </div>
      </section>

      <main class="max-w-7xl mx-auto px-6 pb-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-7">
            ${imageBlock}
          </div>

          <div class="lg:col-span-5 flex flex-col gap-8">
            <div class="glass-card p-10">
              <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Параметры</div>
              <div class="mt-4 space-y-2 text-sm text-slate-600 leading-relaxed">
                ${params || '<div>Детали проекта в публичной версии ограничены.</div>'}
              </div>
            </div>

            <div class="glass-card p-10">
              <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Состав работ</div>
              <ul class="mt-4 space-y-2">
                ${scopeItems || '<li class="text-sm text-slate-600 leading-relaxed">Поставка / ПНР / сервис (по проекту).</li>'}
              </ul>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div class="glass-card p-10">
            <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Результат</div>
            <div class="mt-4 text-sm text-slate-600 leading-relaxed">
              ${resultText || 'Результат описан в публичной версии без коммерческих деталей.'}
            </div>
          </div>

          <div class="glass-card p-10">
            <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Ограничения</div>
            <div class="mt-4 text-sm text-slate-600 leading-relaxed">
              ${ndaText || 'Часть информации по проекту ограничена условиями NDA.'}
            </div>
          </div>
        </div>
      </main>

      <div id="footer-placeholder"></div>
    </div>

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
    if (!item.industry) missing.push('industry');
    if (!item.region) missing.push('region');
    if (!item.power) missing.push('power');
    if (!item.units) missing.push('units');
    if (!item.mode) missing.push('mode');
    if (!item.scope || !Array.isArray(item.scope) || item.scope.length === 0) missing.push('scope');
    if (!item.result) missing.push('result');
    if (!item.ndaLabel) missing.push('ndaLabel');

    if (missing.length) {
      throw new Error(`Item "${item.slug || '(no slug)'}" missing fields: ${missing.join(', ')}`);
    }
    if (seen.has(item.slug)) throw new Error(`Duplicate slug: ${item.slug}`);
    seen.add(item.slug);
  }

  // Write output pages to repo root as <slug>.html to avoid breaking existing relative nav links.
  await Promise.all(
    items.map(async (item) => {
      const outPath = path.join(ROOT, `${item.slug}.html`);
      await fs.writeFile(outPath, render(item), 'utf8');
    })
  );

  // Basic manifest for quick checks.
  const manifest = items.map((i) => ({ slug: i.slug, page: `${i.slug}.html` }));
  await fs.writeFile(path.join(ROOT, 'data', 'projects.manifest.json'), JSON.stringify({ version: 1, items: manifest }, null, 2) + '\n', 'utf8');
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

