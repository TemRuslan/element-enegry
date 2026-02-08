(() => {
  const stream = document.getElementById('articleStream');
  if (!stream) return;

  let pendingBreadcrumbText = null;
  let breadcrumbObserver = null;

  const setBreadcrumbText = (text) => {
    const el = document.getElementById('articleBreadcrumbTitle');
    if (el) {
      el.textContent = text;
      pendingBreadcrumbText = null;
      if (breadcrumbObserver) {
        breadcrumbObserver.disconnect();
        breadcrumbObserver = null;
      }
      return;
    }

    pendingBreadcrumbText = text;
    if (breadcrumbObserver) return;

    breadcrumbObserver = new MutationObserver(() => {
      const next = document.getElementById('articleBreadcrumbTitle');
      if (!next || pendingBreadcrumbText == null) return;
      next.textContent = pendingBreadcrumbText;
      pendingBreadcrumbText = null;
      if (breadcrumbObserver) {
        breadcrumbObserver.disconnect();
        breadcrumbObserver = null;
      }
    });
    breadcrumbObserver.observe(document.body, { childList: true, subtree: true });
  };

  const articles = Array.isArray(window.blogArticles) ? window.blogArticles : [];
  if (articles.length === 0) return;

  const currentSlug = document.body.getAttribute('data-article') || '';
  const foundIndex = articles.findIndex((a) => a && a.slug === currentSlug);
  const startIndex = Math.max(0, foundIndex);

  let nextIndex = startIndex;
  let currentUrl = '';

  const esc = (s) =>
    String(s == null ? '' : s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');

  const resolveAsset = (src) => {
    const s = String(src == null ? '' : src).trim();
    if (!s) return '';

    if (
      s.startsWith('data:') ||
      s.startsWith('http://') ||
      s.startsWith('https://') ||
      s.startsWith('mailto:') ||
      s.startsWith('tel:') ||
      s.startsWith('/') ||
      s.startsWith('../')
    ) {
      // When opening pages from disk (file://), "../" can escape the site folder.
      // Normalize to a site-root relative path.
      return s.replace(/^(\.\.\/)+/, '');
    }

    return s;
  };

  const updateBreadcrumb = (article) => {
    setBreadcrumbText(article.title || 'Статья');
  };

  const updateUrl = (article) => {
    const nextUrl = new URL(`${article.slug}.html`, location.href);
    const next = nextUrl.pathname + nextUrl.search + nextUrl.hash;
    if (currentUrl === next) return;
    currentUrl = next;
    history.replaceState({}, '', next);
    document.title = `${article.title} | Блог | Элемент Энергия`;
    updateBreadcrumb(article);
  };

  const renderBlocks = (blocks) => {
    const arr = Array.isArray(blocks) ? blocks : [];
    const out = [];

    for (const block of arr) {
      if (!block || typeof block !== 'object') continue;
      const type = String(block.type || '');

      if (type === 'p') {
        const text = esc(block.text || '');
        if (!text) continue;
        out.push(`<p class="text-base md:text-lg text-slate-600 leading-relaxed">${text}</p>`);
        continue;
      }

      if (type === 'h3') {
        const text = esc(block.text || '');
        if (!text) continue;
        out.push(
          `<h3 class="pt-8 mt-10 border-t border-slate-900/10 text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">${text}</h3>`
        );
        continue;
      }

      if (type === 'ul') {
        const items = Array.isArray(block.items) ? block.items : [];
        const lis = items
          .filter(Boolean)
          .map((t) => `<li class="text-sm md:text-base text-slate-600 leading-relaxed">${esc(t)}</li>`)
          .join('');
        if (!lis) continue;
        out.push(`<ul class="mt-4 space-y-2">${lis}</ul>`);
        continue;
      }

      if (type === 'checklist') {
        const items = Array.isArray(block.items) ? block.items : [];
        const lis = items
          .filter(Boolean)
          .map(
            (t) => `
              <li class="flex items-start gap-3">
                <i class="fa-solid fa-circle-check text-accent mt-0.5"></i>
                <div class="text-sm md:text-base text-slate-700 leading-relaxed">${esc(t)}</div>
              </li>
            `
          )
          .join('');
        if (!lis) continue;
        out.push(`<ul class="mt-4 space-y-3">${lis}</ul>`);
        continue;
      }

      if (type === 'note') {
        const title = esc(block.title || 'Важно');
        const text = esc(block.text || '');
        if (!text) continue;
        out.push(`
          <div class="mt-8 glass-card p-8 border border-accent/20 bg-white/70">
            <div class="text-[11px] font-black uppercase tracking-[0.22em] text-accent">${title}</div>
            <div class="mt-3 text-sm md:text-base text-slate-700 leading-relaxed">${text}</div>
          </div>
        `);
        continue;
      }

      if (type === 'formula') {
        const text = esc(block.text || '');
        if (!text) continue;
        out.push(`
          <div class="mt-8 ui-card bg-slate-900 text-slate-100 p-6 overflow-x-auto">
            <div class="text-[10px] font-black uppercase tracking-[0.22em] text-slate-300">Формула / расчет</div>
            <pre class="mt-3 whitespace-pre-wrap text-sm leading-relaxed"><code>${text}</code></pre>
          </div>
        `);
        continue;
      }
    }

    return out.join('');
  };

  const renderArticle = (article) => {
    const section = document.createElement('section');
    section.className = 'article-section py-12';
    section.setAttribute('data-slug', article.slug);

    const chips = [article.category || '', article.date || '']
      .filter(Boolean)
      .map(
        (t) =>
          `<span class="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.18em] bg-white/60 border border-slate-900/10 text-slate-600">${esc(
            t
          )}</span>`
      )
      .join('');

    const tags = Array.isArray(article.tags) ? article.tags.filter(Boolean).slice(0, 6) : [];
    const tagsHtml = tags.length
      ? `<div class="mt-3 flex flex-wrap gap-2">${tags
          .map(
            (t) =>
              `<span class="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.18em] bg-accent/10 border border-accent/20 text-accent">${esc(
                t
              )}</span>`
          )
          .join('')}</div>`
      : '';

    const heroMedia = article.image
      ? `
        <div class="mt-10 projects-media relative overflow-hidden border border-slate-900/10 bg-white/40 backdrop-blur-md shadow-[0_28px_80px_rgba(15,23,42,0.10)]">
          <div class="aspect-[16/10] w-full relative">
            <img src="${esc(resolveAsset(article.image))}" alt="${esc(article.imageAlt || article.title)}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
          </div>
        </div>
      `
      : '';

    const blocksHtml = renderBlocks(article.blocks);

    section.innerHTML = `
      <div class="article-top-marker h-px w-full" data-slug="${esc(article.slug)}" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-wrap gap-2">
          ${chips}
        </div>
        ${tagsHtml}

        <h2 class="mt-6 text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.05] break-anywhere">
          ${esc(article.title || 'Статья')}
        </h2>

        ${heroMedia}

        <div class="mt-10 max-w-4xl">
          ${
            article.excerpt
              ? `<div class="text-lg md:text-xl text-slate-600 leading-relaxed">${esc(article.excerpt)}</div>`
              : ''
          }

          <div class="mt-8">
            ${blocksHtml}
          </div>

          <div class="mt-12 glass-card p-8">
            <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Нужен расчет под ваш объект?</div>
            <div class="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Подготовим техническое решение (мощность, состав работ, интеграция, параллельная работа, утилизация тепла) и ориентировочную экономику.
            </div>
	            <a href="index.html#contacts" class="btn-primary mt-6 inline-flex items-center gap-3 px-6 py-4 rounded-xl text-white font-black uppercase tracking-widest text-[11px]">
              Получить расчет <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `;

    return section;
  };

  // Observe a small marker at the top of each article instead of the whole <section>.
  // For long articles, the section intersection ratio is tiny and a high threshold never triggers.
  const urlObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const slug = entry.target.getAttribute('data-slug');
        const article = articles.find((a) => a && a.slug === slug);
        if (article) updateUrl(article);
      }
    },
    // A thin "activation band" around the middle of the viewport.
    { threshold: 0, rootMargin: '-45% 0px -50% 0px' }
  );

  const observeSection = (section) => {
    const marker = section.querySelector('.article-top-marker[data-slug]');
    if (!marker) return;
    urlObserver.observe(marker);
  };

  const sentinel = document.createElement('div');
  sentinel.className = 'article-sentinel h-10';

  let renderedCount = 0;

  const renderDivider = () => {
    const divider = document.createElement('div');
    divider.className = 'article-divider py-14';
    divider.innerHTML = `
      <div class="max-w-7xl mx-auto px-6">
        <div class="h-px bg-slate-900/10"></div>
      </div>
    `;
    return divider;
  };

  const appendNext = () => {
    if (articles.length === 0) return;
    if (nextIndex >= articles.length) nextIndex = 0; // loop like AI Pool

    const section = renderArticle(articles[nextIndex]);
    if (renderedCount > 0) {
      stream.insertBefore(renderDivider(), sentinel);
    }
    stream.insertBefore(section, sentinel);
    observeSection(section);

    nextIndex += 1;
    renderedCount += 1;
  };

  const sentinelObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        appendNext();
      }
    },
    { rootMargin: '300px' }
  );

  stream.appendChild(sentinel);
  sentinelObserver.observe(sentinel);

  // Render current and next immediately.
  appendNext();
  appendNext();

  const first = articles[startIndex] || articles[0];
  if (first) updateUrl(first);
})();
