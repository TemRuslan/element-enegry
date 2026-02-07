/* Shared UI for GPU catalog cards.
   Data source: window.GPU_CATALOG (see js/gpu-catalog-data.js).

   Provides:
   - window.GPU_UI.renderCard(item) -> HTML string for a GPU card
   - window.GPU_UI.mountDataAttrCards() -> renders containers with [data-gpu-cards="id1,id2,..."]
*/
(function () {
    const GPU_UI = window.GPU_UI = window.GPU_UI || {};

    const CARD_IMAGES = Object.freeze({
        gpu_65: 'assets/site-photos/gpu/gpu-65.jpg',
        gpu_145: 'assets/site-photos/gpu/gpu-145.jpg',
        gpu_250: 'assets/site-photos/gpu/gpu-250.jpg',
        gpu_400: 'assets/site-photos/gpu/gpu-400.jpg',
        gpu_530: 'assets/site-photos/gpu/gpu-530.png',
        container: 'assets/site-photos/gpu/gpu-container.jpg',
        mining: 'assets/site-photos/applications/mining-racks.jpg',
    });

    function getData() {
        return Array.isArray(window.GPU_CATALOG) ? window.GPU_CATALOG : [];
    }

    function findById(id) {
        const wanted = String(id || '').trim();
        if (!wanted) return null;
        return getData().find((x) => String(x && x.id) === wanted) || null;
    }

    function formatRub(value) {
        if (value === null || value === undefined) return 'Цена по запросу';
        const n = Number(value);
        if (!Number.isFinite(n) || n <= 0) return 'Цена по запросу';
        return `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`;
    }

    function normalizeName(name) {
        let s = String(name || '').trim();
        if (!s) return '';
        s = s.replace(/^гпу(?=\s|$)/i, 'ГПУ');
        s = s.replace(/квт/gi, 'кВт');
        s = s.replace(/\s+/g, ' ');
        return s;
    }

    // Card titles are uppercase and relatively large, so long names can overflow/truncate visually.
    // We keep the full title in the tooltip, but shorten the rendered title for readability.
    function shortenTitleForCard(fullTitle) {
        let t = String(fullTitle || '').trim();
        if (!t) return '';
        if (t.length <= 48) return t;

        t = t.replace(/\s*\+\s*/g, ' + ');
        t = t.replace(/\s*-\s*/g, ' - ');
        t = t.replace(/\s*\|\s*/g, ' | ');

        // Normalize some verbose phrases.
        t = t.replace(/Система\s*Утилизации\s*Тепла\s*\(СУТ\)\s*100%/gi, 'СУТ 100%');
        t = t.replace(/Система\s*Утилизации\s*Тепла\s*\(СУТ\)/gi, 'СУТ');
        t = t.replace(/параллельная\s+работ[аa]т?\s+с\s+сетью/gi, 'параллель с сетью');

        // "Модифицированный" variants.
        t = t.replace(/модифицированный\s*\(МОД\)/gi, 'МОД');
        t = t.replace(/мод\s*\(модифицированная\)/gi, 'МОД');
        t = t.replace(/(^|\s)мод(?=\s|$)/gi, '$1МОД');

        // Remove marketing wording, keep key options (pills already cover most options).
        t = t.replace(/(^|\s)для\s+производственников(?=\s|$)/gi, '$1');
        t = t.replace(/(^|\s)для\s+производства(?=\s|$)/gi, '$1');

        // Container/placement wording.
        t = t.replace(/для\s+размещения\s+в\s+контейнере/gi, '(контейнер)');
        t = t.replace(/в\s+контейнере/gi, '(контейнер)');

        // Common short forms.
        t = t.replace(/майнинг\s+остров/gi, 'майнинг-остров');
        t = t.replace(/для\s+водяных\s+асиков/gi, 'ASIC (вода)');
        t = t.replace(/для\s+воздушных\s+асиков/gi, 'ASIC (воздух)');

        // Cleanup spacing/punctuation.
        t = t.replace(/\s+\+/g, ' +');
        t = t.replace(/\+\s+/g, ' + ');
        t = t.replace(/\s+/g, ' ').trim();
        t = t.replace(/\s+\)/g, ')');
        t = t.replace(/\(\s+/g, '(');
        t = t.replace(/\s+,/g, ',');
        t = t.replace(/,\s*\+/g, ' +');

        // If still too long, compress separators a bit.
        if (t.length > 64) {
            t = t.replace(/\s*\|\s*/g, ' | ');
            t = t.replace(/\s*-\s*/g, ' | ');
            t = t.replace(/\s+/g, ' ').trim();
        }

        return t;
    }

    function getPills(item) {
        const tags = Array.isArray(item.tags) ? item.tags : [];
        const pills = [];
        if (tags.includes('пнг')) pills.push('ПНГ');
        if (tags.includes('контейнер')) pills.push('Контейнер');
        if (tags.includes('полки')) pills.push('Полки');
        if (tags.includes('сут')) pills.push('СУТ 100%');
        if (tags.includes('параллель с сетью')) pills.push('Параллель с сетью');
        if (tags.includes('интеркулер')) pills.push('Интеркулер');
        if (tags.includes('модифицированная')) pills.push('Модифицированная');
        if (tags.includes('остров')) pills.push('Остров');
        if (tags.includes('майнинг')) pills.push('Майнинг');
        return pills.slice(0, 5);
    }

    function pickSpec(item, key) {
        if (!item || !item.specs) return null;
        return item.specs[key] || null;
    }

    function cardSpecRows(item) {
        const rows = [];
        const engine = pickSpec(item, 'Двигатель (модель)') || pickSpec(item, 'Двигатель') || null;
        const eff = pickSpec(item, 'КПД электрическая') || null;
        const res = pickSpec(item, 'Моторесурс') || null;
        const gas = pickSpec(item, 'Расход газа при 100% нагрузке') || pickSpec(item, 'Расход топлива (100% нагрузка)') || null;

        if (engine) rows.push(['Двигатель', engine]);
        if (eff) rows.push(['КПД электр.', eff]);
        if (res) rows.push(['Ресурс', res]);
        if (gas) rows.push(['Расход', gas]);
        return rows.slice(0, 4);
    }

    function pickCardImage(item) {
        const tags = Array.isArray(item.tags) ? item.tags : [];

        // Most specific first.
        if (tags.includes('майнинг') || tags.includes('полки')) return CARD_IMAGES.mining;
        if (tags.includes('контейнер')) return CARD_IMAGES.container;

        const kw = Number(item.continuous_kw || item.nominal_kw || 0);
        if (!Number.isFinite(kw) || kw <= 0) return CARD_IMAGES.gpu_250;

        if (kw <= 90) return CARD_IMAGES.gpu_65;
        if (kw <= 160) return CARD_IMAGES.gpu_145;
        if (kw <= 260) return CARD_IMAGES.gpu_250;
        if (kw <= 430) return CARD_IMAGES.gpu_400;
        return CARD_IMAGES.gpu_530;
    }

    function detailPageUrl(item) {
        if (!item) return null;
        const tags = Array.isArray(item.tags) ? item.tags : [];

        // Dedicated product page: GPU 250 kW nominal / 210 kW continuous (base, not container/mining).
        const is210Base = Number(item.nominal_kw) === 250
            && Number(item.continuous_kw) === 210
            && !tags.includes('контейнер')
            && !tags.includes('полки');
        if (is210Base) return 'products/gpu-250-210/index.html';

        return `products/gpu/index.html?id=${encodeURIComponent(item.id)}`;
    }

    function renderCard(item) {
        const fullTitle = normalizeName(item.display_name || item.matrix_name);
        const title = shortenTitleForCard(fullTitle);
        const pills = getPills(item);
        const imgSrc = pickCardImage(item);
        const price = formatRub(item.price_rrc_rub);
        const detailsUrl = detailPageUrl(item);

        // Prepare Specs List (Max/Const Power + Others)
        const specsList = [];
        if (item.nominal_kw) specsList.push({ label: 'Макс. мощн.', value: item.nominal_kw + ' кВт', icon: 'fa-bolt' });
        if (item.continuous_kw) specsList.push({ label: 'Пост. мощн.', value: item.continuous_kw + ' кВт', icon: 'fa-plug' });

        // Add standard specs
        const extra = cardSpecRows(item);
        extra.forEach(([k, v]) => {
            // Map keys to shorter labels
            let label = k;
            if (k === 'Двигатель') label = 'Двигатель';
            if (k === 'КПД электр.') label = 'КПД эл.';
            if (k === 'Ресурс') label = 'Ресурс';
            if (k === 'Расход') label = 'Расход';
            specsList.push({ label, value: v, icon: 'fa-microchip' }); // generic icon
        });

        // Limit to 4 or 6 boxes to fit nicely
        const finalSpecs = specsList.slice(0, 4);

        // Light card to match the page theme.
        return `
	            <article data-gpu-card-link="${detailsUrl}" tabindex="0" role="link" class="gpu-card-link bg-white/75 backdrop-blur border border-slate-200/70 ui-card overflow-hidden relative flex flex-col h-full shadow-[0_14px_30px_rgba(15,23,42,0.06)] cursor-pointer">
                <!-- Image Section -->
                <div class="h-56 relative overflow-hidden bg-slate-100 border-b border-slate-200/70">
                    <img src="${imgSrc}" alt="${fullTitle}" loading="lazy" 
                        class="w-full h-full object-cover">
                    
                    <!-- Floating Badge -->
                    <div class="absolute top-3 left-3 z-20 flex flex-wrap gap-1">
                         ${pills.slice(0, 2).map(p => `
                            <span class="bg-white/85 backdrop-blur text-slate-700 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-sm border border-slate-200/70">
                                ${p}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Content Section -->
                <div class="p-5 flex flex-col flex-grow relative z-20">
                    <!-- Title (wraps fully; shortened if needed) -->
                    <h3 class="text-[15px] md:text-base font-black uppercase tracking-tight text-slate-900 leading-snug mb-3 break-words" title="${fullTitle}">
                        ${title}
                    </h3>
                    
                    <!-- Unified Specs Grid (All Boxed) -->
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        ${finalSpecs.map(s => `
                            <div class="bg-white/70 rounded-lg p-3 border border-slate-200/70 flex flex-col justify-center min-h-[54px]">
                                <div class="text-[9px] uppercase font-black text-slate-500 tracking-wider mb-1 truncate" title="${s.label}">${s.label}</div>
                                <div class="text-xs font-black text-slate-900 truncate" title="${s.value}">${s.value}</div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Footer: Price + Button in one row -->
                    <div class="mt-auto pt-2">
                        <div class="flex items-center justify-between gap-3">
                            <div class="min-w-0">
                                <div class="text-[9px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1.5">Цена с НДС</div>
                                <div class="text-xl font-black text-slate-900 tracking-tight leading-none truncate">${price}</div>
                            </div>
	                        <a class="btn-primary shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest text-white transition hover:brightness-110" href="${detailsUrl}">
	                            <span>Подробнее</span>
	                            <i class="fa-solid fa-arrow-right text-white/70"></i>
	                        </a>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    function renderCardsInto(containerEl, items) {
        if (!containerEl) return;
        const list = Array.isArray(items) ? items : [];
        containerEl.innerHTML = list.map((item) => renderCard(item)).join('');
    }

    function wireCardClicks(container) {
        if (!container) return;
        if (container.dataset && container.dataset.gpuUiWired === '1') return;
        if (container.dataset) container.dataset.gpuUiWired = '1';

        const isInteractive = (el) => {
            if (!el || !el.closest) return false;
            return Boolean(el.closest('a,button,input,select,textarea,label'));
        };

        container.addEventListener('click', (e) => {
            const card = e.target && e.target.closest ? e.target.closest('[data-gpu-card-link]') : null;
            if (!card) return;
            if (isInteractive(e.target)) return;
            const url = card.getAttribute('data-gpu-card-link');
            if (!url) return;
            window.location.href = url;
        });

        container.addEventListener('keydown', (e) => {
            const card = e.target && e.target.closest ? e.target.closest('[data-gpu-card-link]') : null;
            if (!card) return;
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const url = card.getAttribute('data-gpu-card-link');
            if (!url) return;
            e.preventDefault();
            window.location.href = url;
        });
    }

    function parseIdsAttr(raw) {
        const s = String(raw || '');
        if (!s.trim()) return [];
        return s.split(',')
            .map((x) => String(x || '').trim())
            .filter(Boolean);
    }

    function mountDataAttrCards() {
        const nodes = document.querySelectorAll('[data-gpu-cards]');
        if (!nodes || !nodes.length) return;

        nodes.forEach((el) => {
            const raw = el.getAttribute('data-gpu-cards');
            const ids = parseIdsAttr(raw);
            const items = ids
                .map((id) => {
                    const it = findById(id);
                    if (!it) console.warn('[GPU_UI] GPU id not found:', id, el);
                    return it;
                })
                .filter(Boolean);

            renderCardsInto(el, items);
            wireCardClicks(el);
        });
    }

    GPU_UI.getData = getData;
    GPU_UI.findById = findById;
    GPU_UI.renderCard = renderCard;
    GPU_UI.renderCardsInto = renderCardsInto;
    GPU_UI.wireCardClicks = wireCardClicks;
    GPU_UI.mountDataAttrCards = mountDataAttrCards;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountDataAttrCards);
    } else {
        mountDataAttrCards();
    }
})();

