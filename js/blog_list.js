(() => {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  const articles = Array.isArray(window.blogArticles) ? window.blogArticles : [];
  if (articles.length === 0) return;

  const safeText = (v) => (v == null ? '' : String(v));
  const resolveAsset = (src) => {
    const s = safeText(src).trim();
    if (!s) return '';
    if (
      s.startsWith('data:') ||
      s.startsWith('http://') ||
      s.startsWith('https://') ||
      s.startsWith('/') ||
      s.startsWith('../')
    ) {
      // When opening pages from disk (file://), "../" can escape the site folder.
      // Normalize to a site-root relative path.
      return s.replace(/^(\.\.\/)+/, '');
    }
    return s;
  };

  const renderCard = (item) => {
    const href = safeText(item.slug) ? `blog/${safeText(item.slug)}.html` : 'blog/index.html';

    const card = document.createElement('a');
    card.href = href;
    card.className = 'glass-card p-10 flex flex-col no-underline';
    card.setAttribute('aria-label', safeText(item.title || 'Статья'));

    const media = document.createElement('div');
    media.className = 'projects-card-media relative overflow-hidden bg-white/40';

    if (item.image) {
      const img = document.createElement('img');
      img.src = resolveAsset(item.image);
      img.alt = safeText(item.imageAlt || item.title || 'Изображение');
      img.loading = 'lazy';
      img.className = 'w-full h-auto aspect-[16/10] object-cover';
      media.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'w-full aspect-[16/10] bg-slate-900/5';
      placeholder.setAttribute('aria-hidden', 'true');
      media.appendChild(placeholder);
    }

    card.appendChild(media);

    const metaRow = document.createElement('div');
    metaRow.className = 'flex items-baseline justify-between gap-4';

    const category = document.createElement('div');
    category.className = 'text-[11px] font-black uppercase tracking-[0.22em] text-accent';
    category.textContent = safeText(item.category || '');
    metaRow.appendChild(category);

    const date = document.createElement('div');
    date.className = 'text-[11px] font-black uppercase tracking-[0.22em] text-slate-500 text-right';
    date.textContent = safeText(item.date || '');
    metaRow.appendChild(date);

    card.appendChild(metaRow);

    const title = document.createElement('div');
    title.className = 'mt-4 text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 break-anywhere';
    title.textContent = safeText(item.title || 'Статья');
    card.appendChild(title);

    const excerpt = document.createElement('div');
    excerpt.className = 'mt-4 text-sm text-slate-600 leading-relaxed break-anywhere';
    excerpt.textContent = safeText(item.excerpt || '');
    if (excerpt.textContent) card.appendChild(excerpt);

    const more = document.createElement('div');
    more.className = 'mt-8 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-accent';
    more.innerHTML = `Читать <i class="fa-solid fa-arrow-right"></i>`;
    card.appendChild(more);

    return card;
  };

  // The array is already sorted by scripts/generate_blog_pages.mjs, but keep it explicit.
  const sorted = [...articles].sort((a, b) => {
    const ad = String(a.isoDate || '');
    const bd = String(b.isoDate || '');
    if (bd !== ad) return bd.localeCompare(ad);
    return String(a.slug || '').localeCompare(String(b.slug || ''));
  });

  for (const item of sorted) grid.appendChild(renderCard(item));
})();
