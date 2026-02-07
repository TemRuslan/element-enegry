(() => {
  const stream = document.getElementById('projectStream');
  if (!stream) return;

  let pendingBreadcrumbText = null;
  let breadcrumbObserver = null;

  const setBreadcrumbText = (text) => {
    const el = document.getElementById('projectBreadcrumbTitle');
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
      const next = document.getElementById('projectBreadcrumbTitle');
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

  const projects = Array.isArray(window.projects) ? window.projects : [];
  if (projects.length === 0) return;

  const currentSlug = document.body.getAttribute('data-project') || '';
  const foundIndex = projects.findIndex((p) => p && p.slug === currentSlug);
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

  const updateBreadcrumb = (project) => {
    setBreadcrumbText(project.title || 'Проект');
  };

  const updateUrl = (project) => {
    const nextUrl = new URL(`${project.slug}.html`, location.href);
    const next = nextUrl.pathname + nextUrl.search + nextUrl.hash;
    if (currentUrl === next) return;
    currentUrl = next;
    history.replaceState({}, '', next);
    document.title = `${project.title} | Проекты | Элемент Энергия`;
    updateBreadcrumb(project);
  };

  const renderProject = (project) => {
    const section = document.createElement('section');
    section.className = 'project-section py-12';
    section.setAttribute('data-slug', project.slug);

    const chips = [
      project.year ? String(project.year) : '',
      project.industry || '',
      project.region || '',
      project.mode ? `Режим: ${project.mode}` : '',
    ]
      .filter(Boolean)
      .map(
        (t) =>
          `<span class="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.18em] bg-white/60 border border-slate-900/10 text-slate-600">${esc(
            t
          )}</span>`
      )
      .join('');

    const heroMedia = project.image
      ? `
        <div class="projects-media relative overflow-hidden border border-slate-900/10 bg-white/40 backdrop-blur-md shadow-[0_28px_80px_rgba(15,23,42,0.10)]">
          <div class="aspect-[16/10] w-full relative">
            <img src="${esc(project.image)}" alt="${esc(project.title)}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
          </div>
        </div>
      `
      : '';

    const params = [
      project.power ? `<div><span class="text-slate-500">Мощность:</span> ${esc(project.power)}</div>` : '',
      project.units ? `<div><span class="text-slate-500">Агрегаты:</span> ${esc(project.units)}</div>` : '',
      project.contractSum ? `<div><span class="text-slate-500">Сумма договора:</span> ${esc(project.contractSum)}</div>` : '',
    ]
      .filter(Boolean)
      .join('');

    const scopeItems = Array.isArray(project.scope) ? project.scope.filter(Boolean) : [];
    const scopeHtml = scopeItems.length
      ? `<ul class="mt-4 space-y-2">${scopeItems
          .map((s) => `<li class="text-sm text-slate-600 leading-relaxed">${esc(s)}</li>`)
          .join('')}</ul>`
      : `<div class="mt-4 text-sm text-slate-600 leading-relaxed">Поставка / ПНР / сервис (по проекту).</div>`;

    section.innerHTML = `
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-wrap gap-2">
          ${chips}
        </div>

        <h2 class="mt-6 text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.05]">
          ${esc(project.title)}
        </h2>

        ${
          project.customer
            ? `<div class="mt-4 text-sm font-black uppercase tracking-tight text-slate-700 break-anywhere">${esc(
                project.customer
              )}</div>`
            : ''
        }

        <div class="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          ${
            heroMedia
              ? `<div class="lg:col-span-7">${heroMedia}</div>`
              : ''
          }

          <div class="${
            heroMedia ? 'lg:col-span-5' : 'lg:col-span-12'
          }">
            <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Описание проекта</div>
            <div class="mt-4 text-sm text-slate-600 leading-relaxed">
              ${esc(project.description || '')}
            </div>

            <div class="mt-8 pt-8 border-t border-slate-900/10">
              <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Параметры</div>
              <div class="mt-4 space-y-2 text-sm text-slate-600 leading-relaxed">
                ${params || '<div>Параметры проекта.</div>'}
              </div>
            </div>

            <div class="mt-8 pt-8 border-t border-slate-900/10">
              <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Состав работ</div>
              ${scopeHtml}
            </div>

            <div class="mt-8 pt-8 border-t border-slate-900/10">
              <div class="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">Результат</div>
              <div class="mt-4 text-sm text-slate-600 leading-relaxed">
                ${esc(project.result || '')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return section;
  };

  const observeSection = (section) => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const slug = entry.target.getAttribute('data-slug');
          const project = projects.find((p) => p && p.slug === slug);
          if (project) updateUrl(project);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(section);
  };

  const sentinel = document.createElement('div');
  sentinel.className = 'project-sentinel h-10';

  let renderedCount = 0;

  const renderDivider = () => {
    const divider = document.createElement('div');
    divider.className = 'project-divider py-14';
    divider.innerHTML = `
      <div class="max-w-7xl mx-auto px-6">
        <div class="h-px bg-slate-900/10"></div>
      </div>
    `;
    return divider;
  };

  const appendNext = () => {
    if (projects.length === 0) return;
    if (nextIndex >= projects.length) nextIndex = 0; // loop like blog
    const section = renderProject(projects[nextIndex]);

    // Add a centered divider between projects (in the middle of the vertical gap).
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

  const first = projects[startIndex] || projects[0];
  if (first) updateUrl(first);
})();
