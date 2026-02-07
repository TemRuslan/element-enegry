/* Catalog rendering for GPU products.
   Data source: window.GPU_CATALOG (see js/gpu-catalog-data.js). */
(function () {
    const data = Array.isArray(window.GPU_CATALOG) ? window.GPU_CATALOG : [];

    const CARD_IMAGES = Object.freeze({
        gpu_65: 'assets/site-photos/gpu/gpu-65.jpg',
        gpu_145: 'assets/site-photos/gpu/gpu-145.jpg',
        gpu_250: 'assets/site-photos/gpu/gpu-250.jpg',
        gpu_400: 'assets/site-photos/gpu/gpu-400.jpg',
        gpu_530: 'assets/site-photos/gpu/gpu-530.png',
        container: 'assets/site-photos/gpu/gpu-container.jpg',
        mining: 'assets/site-photos/applications/mining-racks.jpg',
    });

    function formatRub(value) {
        if (value === null || value === undefined) return 'Цена по запросу';
        const n = Number(value);
        if (!Number.isFinite(n) || n <= 0) return 'Цена по запросу';
        return `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`;
    }

    function formatKW(value) {
        if (value === null || value === undefined) return null;
        const n = Number(value);
        if (!Number.isFinite(n) || n <= 0) return null;
        return `${Math.round(n)} кВт`;
    }

    function normalizeName(name) {
        let s = String(name || '').trim();
        if (!s) return '';
        s = s.replace(/^гпу\b/i, 'ГПУ');
        s = s.replace(/квт/gi, 'кВт');
        s = s.replace(/\s+/g, ' ');
        return s;
    }

    function uniq(arr) {
        return Array.from(new Set(arr.filter(Boolean)));
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

    function powerLine(item) {
        const cont = formatKW(item.continuous_kw);
        const nom = formatKW(item.nominal_kw);
        if (cont && nom) return `${cont} пост. / ${nom} ном.`;
        if (cont) return `${cont} постоянная мощность`;
        if (nom) return `${nom} номинальная мощность`;
        return null;
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
        if (is210Base) return 'gpu-250-210.html';

        return null;
    }

    function renderCard(item) {
        const title = normalizeName(item.display_name || item.matrix_name);
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
            <article class="bg-white/75 backdrop-blur border border-slate-200/70 rounded-2xl overflow-hidden group hover:border-accent/50 transition-all duration-300 relative flex flex-col h-full shadow-[0_14px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_44px_rgba(15,23,42,0.08)]">
                <!-- Image Section -->
                <div class="h-56 relative overflow-hidden bg-slate-100 border-b border-slate-200/70">
                    <img src="${imgSrc}" alt="${title}" loading="lazy" 
                        class="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-500">
                    
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
                    <!-- Title (Truncated 1 line) -->
                    <h3 class="text-lg font-black uppercase tracking-tight text-slate-900 leading-tight mb-4 truncate" title="${title}">
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
                            ${detailsUrl ? `
	                                <a class="btn-primary shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest text-white transition hover:brightness-110" href="${detailsUrl}">
	                                    <span>Подробнее</span>
	                                    <i class="fa-solid fa-arrow-right text-white/70"></i>
	                                </a>
                            ` : `
                                <button class="btn-primary shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest text-white transition hover:brightness-110" data-gpu-open="${item.id}">
                                    <span>Подробнее</span>
                                    <i class="fa-solid fa-arrow-right text-white/70"></i>
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    function ensureModal() {
        let modal = document.getElementById('gpu-modal');
        if (modal) return modal;

        modal = document.createElement('div');
        modal.id = 'gpu-modal';
        modal.className = 'fixed inset-0 z-[2000] hidden';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" data-gpu-close></div>
            <div class="absolute inset-0 overflow-y-auto">
                <div class="min-h-full flex items-end md:items-center justify-center p-4">
                    <div class="w-full max-w-5xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl animate-fade-in-up">
                        <button class="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-800/50 hover:bg-white/10 flex items-center justify-center transition z-50 border border-white/10" data-gpu-close>
                            <i class="fa-solid fa-xmark text-white"></i>
                        </button>
                        <div id="gpu-modal-body"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target.closest('[data-gpu-close]')) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        return modal;
    }

    function openModal(item) {
        const modal = ensureModal();
        const body = document.getElementById('gpu-modal-body');
        if (!body) return;

        const title = normalizeName(item.display_name || item.matrix_name);
        const pills = getPills(item);
        const specs = item.specs || {};
        const description = item.description || "";
        const price = formatRub(item.price_rrc_rub);
        const imgSrc = pickCardImage(item);
        const maxKw = item.nominal_kw ? item.nominal_kw + ' кВт' : '-';
        const constKw = item.continuous_kw ? item.continuous_kw + ' кВт' : '-';

        body.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2">
                <!-- Left: Image & Key Info -->
                <div class="bg-slate-950 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-accent/5"></div>
                    <img src="${imgSrc}" class="w-full h-64 lg:h-80 object-cover rounded-2xl mb-8 relative z-10 shadow-2xl border border-white/10">
                    
                    <div class="relative z-10">
                        <h2 class="text-2xl lg:text-3xl font-black uppercase text-white mb-6 leading-tight">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-4 mb-8">
                             <div class="bg-slate-900/50 rounded-xl p-4 border border-white/10">
                                <div class="text-[10px] uppercase font-black text-slate-500 tracking-wider mb-1">Максимальная</div>
                                <div class="text-xl font-black text-accent">${maxKw}</div>
                            </div>
                            <div class="bg-slate-900/50 rounded-xl p-4 border border-white/10">
                                <div class="text-[10px] uppercase font-black text-slate-500 tracking-wider mb-1">Постоянная</div>
                                <div class="text-xl font-black text-white">${constKw}</div>
                            </div>
                        </div>

                        <div class="flex items-end justify-between border-t border-white/10 pt-6">
                            <div>
                                <div class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Цена с НДС</div>
                                <div class="text-3xl font-black text-white tracking-tight">${price}</div>
                            </div>
                            <button onclick="window.location.href='index.html#contacts'" class="btn-primary py-4 px-8 rounded-xl font-black uppercase text-xs tracking-widest text-white shadow-lg shadow-accent/20 hover:scale-105 transition-transform flex items-center gap-2">
                                <span>Заказать КП</span> <i class="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right: Specs & Details -->
                <div class="p-8 lg:p-12 bg-slate-900 max-h-[90vh] overflow-y-auto">
                    ${description ? `
                        <div class="mb-10">
                            <h4 class="text-xs font-black uppercase tracking-[0.2em] text-accent mb-4">Описание</h4>
                            <p class="text-slate-300 leading-relaxed text-sm bg-slate-950/50 p-6 rounded-2xl border border-white/5">${description}</p>
                        </div>
                    ` : ''}

                    <div>
                        <h4 class="text-xs font-black uppercase tracking-[0.2em] text-accent mb-6">Полные характеристики</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            ${Object.entries(specs).map(([k, v]) => `
                                <div class="flex justify-between items-center py-3 border-b border-white/5 group hover:pl-2 transition-all">
                                    <span class="text-slate-500 text-xs font-bold uppercase tracking-wider truncate pr-2">${k}</span>
                                    <span class="text-white text-xs font-bold text-right">${v}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('gpu-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function wireCardClicks(container) {
        container.addEventListener('click', (e) => {
            const btn = e.target && e.target.closest ? e.target.closest('[data-gpu-open]') : null;
            if (!btn) return;
            const id = btn.getAttribute('data-gpu-open');
            const item = data.find((x) => x.id === id);
            if (item) openModal(item);
        });
    }

    function renderPreview() {
        const host = document.getElementById('catalog-preview-grid');
        if (!host) return;

        // Curated showcase: cover the main powers + one special case.
        const wanted = [
            (x) => /\b65\b/.test(x.matrix_name) && !x.tags.includes('контейнер'),
            (x) => /\b145\b/.test(x.matrix_name) && !x.tags.includes('контейнер'),
            (x) => /\b210\b/.test(x.matrix_name) && !x.tags.includes('контейнер'),
            (x) => /\b230\b/.test(x.matrix_name) && !x.tags.includes('контейнер'),
            (x) => /400\s*\(320\)/i.test(x.matrix_name) || /400\s*\(350\)/i.test(x.matrix_name),
            (x) => /530/.test(x.matrix_name)
        ];

        const picked = [];
        for (const pred of wanted) {
            const it = data.find((x) => pred(x));
            if (it) picked.push(it);
        }

        const cards = uniq(picked.map((x) => x.id))
            .map((id) => data.find((x) => x.id === id))
            .filter(Boolean);

        host.innerHTML = cards.map((item) => renderCard(item)).join('');
        wireCardClicks(host);
    }

    function renderFullCatalog() {
        const host = document.getElementById('gpu-grid');
        if (!host) return;

        const controlsEl = document.getElementById('gpu-controls');
        const countEl = document.getElementById('gpu-count');
        const resetEl = document.getElementById('gpu-reset');
        const mobileToolbarEl = document.getElementById('gpu-mobile-toolbar');
        const mobileFilterOpenEl = document.getElementById('gpu-mobile-filter-open');
        const mobileSortOpenEl = document.getElementById('gpu-mobile-sort-open');
        const mobileCloseEl = document.getElementById('gpu-mobile-close');
        const mobileBadgeEl = document.getElementById('gpu-mobile-badge');
        const priceMinEl = document.getElementById('gpu-price-min');
        const priceMaxEl = document.getElementById('gpu-price-max');
        const priceMinRangeEl = document.getElementById('gpu-price-min-range');
        const priceMaxRangeEl = document.getElementById('gpu-price-max-range');
        const priceFillEl = document.getElementById('gpu-price-fill');

        // One delegated handler for all re-renders.
        wireCardClicks(host);

        function readRadio(name, fallback) {
            const el = document.querySelector(`input[name="${name}"]:checked`);
            return el && el.value !== undefined ? el.value : fallback;
        }

        function readMulti(name) {
            return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                .map((x) => x && x.value !== undefined ? String(x.value) : '')
                .filter(Boolean);
        }

        function readNum(el) {
            if (!el) return null;
            const v = String(el.value || '');
            const digits = v.replace(/[^\d]/g, '');
            if (!digits) return null;
            const n = Number(digits);
            if (!Number.isFinite(n) || n < 0) return null;
            return n;
        }

        function formatIntSpaced(value) {
            const n = Number(value);
            if (!Number.isFinite(n) || n <= 0) return '';
            return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }

        function formatPriceInputKeepCaret(el) {
            if (!el) return;
            const raw = String(el.value || '');
            const digitsAll = raw.replace(/[^\d]/g, '');
            const start = typeof el.selectionStart === 'number' ? el.selectionStart : raw.length;
            const digitsBefore = raw.slice(0, start).replace(/[^\d]/g, '').length;

            if (!digitsAll) {
                el.value = '';
                return;
            }

            const n = Number(digitsAll);
            if (!Number.isFinite(n)) return;
            const formatted = formatIntSpaced(n);
            el.value = formatted;

            // Restore caret based on how many digits were before it.
            if (typeof el.setSelectionRange === 'function') {
                let pos = 0;
                let seen = 0;
                while (pos < formatted.length && seen < digitsBefore) {
                    if (/\d/.test(formatted[pos])) seen++;
                    pos++;
                }
                el.setSelectionRange(pos, pos);
            }
        }

        function clamp(n, lo, hi) {
            const x = Number(n);
            if (!Number.isFinite(x)) return lo;
            return Math.min(hi, Math.max(lo, x));
        }

        function getItemPriceRub(x) {
            if (!x) return null;
            const a = Number(x.price_rrc_rub);
            if (Number.isFinite(a) && a > 0) return a;
            const b = Number(x.price_min_rub);
            if (Number.isFinite(b) && b > 0) return b;
            return null;
        }

        function initPriceRangeBounds() {
            if (!priceMinRangeEl || !priceMaxRangeEl) return;

            const prices = data.map(getItemPriceRub).filter((n) => Number.isFinite(n) && n > 0);
            const dataMax = prices.length ? Math.max(...prices) : 0;

            // User preference: keep the price filter practical by default.
            const HARD_MIN = 1_000_000;
            const HARD_MAX = 22_000_000;

            const step = Number(priceMinRangeEl.step || 100000) || 100000;
            const ceilToStep = (n) => Math.ceil(n / step) * step;

            const minBound = HARD_MIN;
            const maxBound = Math.max(minBound, Math.min(HARD_MAX, ceilToStep(dataMax || HARD_MAX)));

            priceMinRangeEl.min = String(minBound);
            priceMinRangeEl.max = String(maxBound);
            priceMaxRangeEl.min = String(minBound);
            priceMaxRangeEl.max = String(maxBound);

            priceMinRangeEl.value = String(minBound);
            priceMaxRangeEl.value = String(maxBound);

            if (priceMinEl) {
                priceMinEl.value = '';
                priceMinEl.placeholder = formatIntSpaced(minBound);
            }
            if (priceMaxEl) {
                priceMaxEl.value = '';
                priceMaxEl.placeholder = formatIntSpaced(maxBound);
            }
        }

        function setRangeFill(minV, maxV) {
            if (!priceFillEl || !priceMinRangeEl || !priceMaxRangeEl) return;
            const lo = Number(priceMinRangeEl.min || 0);
            const hi = Number(priceMinRangeEl.max || 1);
            const den = hi - lo || 1;
            const a = ((minV - lo) / den) * 100;
            const b = ((maxV - lo) / den) * 100;
            priceFillEl.style.left = `${Math.max(0, Math.min(100, a))}%`;
            priceFillEl.style.right = `${Math.max(0, Math.min(100, 100 - b))}%`;
        }

        function syncPriceInputsFromRanges() {
            if (!priceMinRangeEl || !priceMaxRangeEl) return;
            const lo = Number(priceMinRangeEl.min || 0);
            const hi = Number(priceMinRangeEl.max || 0);

            let minV = clamp(priceMinRangeEl.value, lo, hi);
            let maxV = clamp(priceMaxRangeEl.value, lo, hi);
            if (minV > maxV) {
                // Keep thumbs ordered.
                const t = minV;
                minV = maxV;
                maxV = t;
            }

            priceMinRangeEl.value = String(minV);
            priceMaxRangeEl.value = String(maxV);
            if (priceMinEl) priceMinEl.value = minV ? formatIntSpaced(minV) : '';
            if (priceMaxEl) priceMaxEl.value = maxV !== hi ? formatIntSpaced(maxV) : '';
            setRangeFill(minV, maxV);
        }

        function syncRangesFromPriceInputs() {
            if (!priceMinRangeEl || !priceMaxRangeEl) return;
            const lo = Number(priceMinRangeEl.min || 0);
            const hi = Number(priceMinRangeEl.max || 0);

            let minV = readNum(priceMinEl);
            let maxV = readNum(priceMaxEl);

            // Empty means "not set": keep slider at edges.
            minV = minV === null ? lo : clamp(minV, lo, hi);
            maxV = maxV === null ? hi : clamp(maxV, lo, hi);
            if (minV > maxV) minV = maxV;

            priceMinRangeEl.value = String(minV);
            priceMaxRangeEl.value = String(maxV);
            setRangeFill(minV, maxV);
        }

        function normalizeAnyGroup(name, changedEl) {
            const all = Array.from(document.querySelectorAll(`input[name="${name}"]`));
            if (!all.length) return;

            const anyEl = all.find((x) => x && String(x.value) === 'any');
            const checked = all.filter((x) => x && x.checked);
            const hasAny = checked.some((x) => String(x.value) === 'any');

            // If user checks "any", it disables all others.
            if (changedEl && String(changedEl.value) === 'any' && changedEl.checked) {
                all.forEach((x) => {
                    if (x !== changedEl) x.checked = false;
                });
                return;
            }

            // If user checks any specific option, disable "any".
            if (hasAny && checked.length > 1 && anyEl) {
                anyEl.checked = false;
            }

            // If nothing selected, fall back to "any".
            const anyCheckedNow = all.some((x) => x && x.checked && String(x.value) === 'any');
            const anyOtherChecked = all.some((x) => x && x.checked && String(x.value) !== 'any');
            if (!anyCheckedNow && !anyOtherChecked && anyEl) anyEl.checked = true;
        }

        function isMobileLayout() {
            return typeof window !== 'undefined'
                && window.matchMedia
                && window.matchMedia('(max-width: 1279px)').matches;
        }

        function openMobileFilters(section) {
            document.body.classList.add('gpu-mobile-filters-open');
            if (mobileToolbarEl) mobileToolbarEl.classList.add('is-hidden');
            document.body.style.overflow = 'hidden';

            // Focus the requested section inside the sheet.
            window.setTimeout(() => {
                const id = section === 'sort' ? 'gpu-sort-section' : 'gpu-filter-section';
                const el = document.getElementById(id);
                if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start' });
            }, 0);
        }

        function closeMobileFilters() {
            document.body.classList.remove('gpu-mobile-filters-open');
            if (mobileToolbarEl) mobileToolbarEl.classList.remove('is-hidden');
            document.body.style.overflow = '';
        }

        function activeFiltersCount() {
            let n = 0;
            const type = readRadio('gpu-type', 'all') || 'all';
            const gas = readRadio('gpu-gas', 'any') || 'any';
            const execSel = readMulti('gpu-exec');
            const industrySel = readMulti('gpu-industry');
            const nominalSel = readMulti('gpu-power-nom');
            const continuousSel = readMulti('gpu-power-cont');

            if (type !== 'all') n++;
            if (gas !== 'any') n++;
            if (execSel.length && !(execSel.length === 1 && execSel[0] === 'any')) n++;
            if (industrySel.length && !(industrySel.length === 1 && industrySel[0] === 'any')) n++;
            if (nominalSel.length && !(nominalSel.length === 1 && nominalSel[0] === 'any')) n++;
            if (continuousSel.length && !(continuousSel.length === 1 && continuousSel[0] === 'any')) n++;
            if (readNum(priceMinEl) !== null || readNum(priceMaxEl) !== null) n++;
            return n;
        }

        function apply() {
            const type = readRadio('gpu-type', 'all') || 'all';
            const gas = readRadio('gpu-gas', 'any') || 'any';
            const execSelRaw = readMulti('gpu-exec');
            const industrySelRaw = readMulti('gpu-industry');
            const sort = readRadio('gpu-sort', 'popular') || 'popular';
            const nominalSelRaw = readMulti('gpu-power-nom');
            const continuousSelRaw = readMulti('gpu-power-cont');
            const priceMin = readNum(priceMinEl);
            const priceMax = readNum(priceMaxEl);

            let list = data.slice();

            const isMining = (tags) => tags.includes('майнинг') || tags.includes('полки');

            // Defensive: if user somehow ends up with "any" + specific options checked,
            // treat it as specific options (otherwise we'd skip filtering).
            const normalizeSel = (sel) => {
                if (!Array.isArray(sel)) return [];
                if (sel.includes('any') && sel.length > 1) return sel.filter((x) => x !== 'any');
                return sel;
            };

            const execSel = normalizeSel(execSelRaw);
            const industrySel = normalizeSel(industrySelRaw);
            const nominalSel = normalizeSel(nominalSelRaw);
            const continuousSel = normalizeSel(continuousSelRaw);

            if (type !== 'all') {
                list = list.filter((x) => {
                    const tags = Array.isArray(x.tags) ? x.tags : [];
                    if (type === 'base') return !tags.includes('модифицированная');
                    if (type === 'mod') return tags.includes('модифицированная');
                    return true;
                });
            }

            if (gas !== 'any') {
                list = list.filter((x) => {
                    const tags = Array.isArray(x.tags) ? x.tags : [];
                    const specs = x && x.specs ? x.specs : {};
                    const hay = `${x.matrix_name || ''} ${x.display_name || ''} ${Object.values(specs).join(' ')}`.toLowerCase();
                    if (gas === 'apg') return tags.includes('пнг');
                    if (gas === 'pipe_ng') return !tags.includes('пнг');
                    if (gas === 'var') return tags.includes('пнг') || tags.includes('модифицированная') || /перемен/i.test(hay);
                    return true;
                });
            }

            if (execSel.length && !execSel.includes('any')) {
                const casingRe = /кожух|капот|шумозащит|шумозащ/i;
                list = list.filter((x) => {
                    const tags = Array.isArray(x.tags) ? x.tags : [];
                    const specs = x && x.specs ? x.specs : {};
                    const hay = `${x.matrix_name || ''} ${x.display_name || ''} ${Object.values(specs).join(' ')}`.toLowerCase();

                    const open = !tags.includes('контейнер');
                    const container = tags.includes('контейнер');
                    const casing = tags.includes('кожух') || casingRe.test(hay);

                    return execSel.some((k) => {
                        if (k === 'open') return open;
                        if (k === 'container') return container;
                        if (k === 'casing') return casing;
                        return true;
                    });
                });
            }

            if (industrySel.length && !industrySel.includes('any')) {
                list = list.filter((x) => {
                    const tags = Array.isArray(x.tags) ? x.tags : [];
                    const mining = isMining(tags);
                    const oilgas = tags.includes('пнг');
                    const container = tags.includes('контейнер');

                    return industrySel.some((industry) => {
                        if (industry === 'oilgas') return oilgas;
                        if (industry === 'mining') return mining;
                        if (industry === 'industry') return !mining && !oilgas;
                        if (industry === 'agro') return !mining && !oilgas && !tags.includes('контейнер') && !tags.includes('модифицированная');
                        if (industry === 'dc') return container && !mining;
                        if (industry === 'zhkh') {
                            const kw = Number(x.continuous_kw || x.nominal_kw || 0);
                            // Approximation: municipal/utility cases tend to use smaller standard sets.
                            return !mining && !oilgas && Number.isFinite(kw) && kw > 0 && kw <= 250;
                        }
                        return true;
                    });
                });
            }

            if (nominalSel.length && !nominalSel.includes('any')) {
                const set = new Set(nominalSel.map((x) => Number(x)).filter((x) => Number.isFinite(x)));
                if (set.size) list = list.filter((x) => set.has(Number(x.nominal_kw)));
            }

            if (continuousSel.length && !continuousSel.includes('any')) {
                const set = new Set(continuousSel.map((x) => Number(x)).filter((x) => Number.isFinite(x)));
                if (set.size) list = list.filter((x) => set.has(Number(x.continuous_kw)));
            }

            if (priceMin !== null || priceMax !== null) {
                list = list.filter((x) => {
                    const p = Number(x.price_rrc_rub);
                    if (!Number.isFinite(p) || p <= 0) return false;
                    if (priceMin !== null && p < priceMin) return false;
                    if (priceMax !== null && p > priceMax) return false;
                    return true;
                });
            }

            if (sort === 'popular') {
                const score = (x) => {
                    const tags = Array.isArray(x.tags) ? x.tags : [];
                    const isTop = Number(x.nominal_kw) === 250
                        && Number(x.continuous_kw) === 210
                        && !tags.includes('контейнер')
                        && !tags.includes('майнинг')
                        && !tags.includes('полки');
                    return isTop ? 1000 : 0;
                };
                list.sort((a, b) => {
                    const d = score(b) - score(a);
                    if (d) return d;
                    const ak = a.continuous_kw || a.nominal_kw || 1e18;
                    const bk = b.continuous_kw || b.nominal_kw || 1e18;
                    return ak - bk;
                });
            } else if (sort === 'power_desc') {
                list.sort((a, b) => {
                    const ak = a.continuous_kw || a.nominal_kw || -1;
                    const bk = b.continuous_kw || b.nominal_kw || -1;
                    return bk - ak;
                });
            } else if (sort === 'price_asc') {
                list.sort((a, b) => (a.price_rrc_rub || 1e18) - (b.price_rrc_rub || 1e18));
            } else if (sort === 'price_desc') {
                list.sort((a, b) => (b.price_rrc_rub || -1) - (a.price_rrc_rub || -1));
            } else {
                // power_asc default
                list.sort((a, b) => {
                    const ak = a.continuous_kw || a.nominal_kw || 1e18;
                    const bk = b.continuous_kw || b.nominal_kw || 1e18;
                    return ak - bk;
                });
            }

            host.innerHTML = list.map((item) => renderCard(item)).join('');

            if (countEl) countEl.textContent = `Позиции: ${list.length}`;

            if (mobileBadgeEl) {
                const k = activeFiltersCount();
                mobileBadgeEl.textContent = String(k);
                mobileBadgeEl.style.display = k > 0 ? 'inline-flex' : 'none';
            }
        }

        if (controlsEl) {
            controlsEl.addEventListener('change', (e) => {
                const t = e && e.target ? e.target : null;
                const name = t && t.name ? String(t.name) : '';
                if (name === 'gpu-exec' || name === 'gpu-industry' || name === 'gpu-power-nom' || name === 'gpu-power-cont') {
                    normalizeAnyGroup(name, t);
                }
                apply();
            });
        }
        if (priceMinEl) priceMinEl.addEventListener('input', () => {
            formatPriceInputKeepCaret(priceMinEl);
            syncRangesFromPriceInputs();
            apply();
        });
        if (priceMaxEl) priceMaxEl.addEventListener('input', () => {
            formatPriceInputKeepCaret(priceMaxEl);
            syncRangesFromPriceInputs();
            apply();
        });
        if (priceMinRangeEl) priceMinRangeEl.addEventListener('input', () => {
            syncPriceInputsFromRanges();
            apply();
        });
        if (priceMaxRangeEl) priceMaxRangeEl.addEventListener('input', () => {
            syncPriceInputsFromRanges();
            apply();
        });
        if (resetEl) {
            resetEl.addEventListener('click', () => {
                const setChecked = (name, value) => {
                    const el = document.querySelector(`input[name="${name}"][value="${value}"]`);
                    if (el) el.checked = true;
                };

                setChecked('gpu-type', 'all');
                setChecked('gpu-gas', 'any');
                setChecked('gpu-sort', 'popular');

                const resetAnyGroup = (name) => {
                    const all = Array.from(document.querySelectorAll(`input[name="${name}"]`));
                    all.forEach((x) => { x.checked = String(x.value) === 'any'; });
                };

                resetAnyGroup('gpu-exec');
                resetAnyGroup('gpu-industry');
                resetAnyGroup('gpu-power-nom');
                resetAnyGroup('gpu-power-cont');
                if (priceMinEl) priceMinEl.value = '';
                if (priceMaxEl) priceMaxEl.value = '';
                if (priceMinRangeEl) priceMinRangeEl.value = String(priceMinRangeEl.min || 0);
                if (priceMaxRangeEl) priceMaxRangeEl.value = String(priceMaxRangeEl.max || 0);
                syncRangesFromPriceInputs();
                apply();
            });
        }

        // Mobile: top toolbar that appears on scroll up and hides on scroll down.
        if (mobileFilterOpenEl) {
            mobileFilterOpenEl.addEventListener('click', (e) => {
                if (e && e.stopPropagation) e.stopPropagation();
                openMobileFilters('filter');
            });
        }
        if (mobileSortOpenEl) {
            mobileSortOpenEl.addEventListener('click', (e) => {
                if (e && e.stopPropagation) e.stopPropagation();
                openMobileFilters('sort');
            });
        }
        if (mobileCloseEl) mobileCloseEl.addEventListener('click', (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            closeMobileFilters();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMobileFilters();
        });

        // Close when tapping on the dark backdrop area (outside panel).
        document.addEventListener('click', (e) => {
            if (!document.body.classList.contains('gpu-mobile-filters-open')) return;
            if (!isMobileLayout()) return;
            if (e && e.target && e.target.closest) {
                if (e.target.closest('#gpu-mobile-filter-open')) return;
                if (e.target.closest('#gpu-mobile-sort-open')) return;
            }
            const sidebarPanel = document.querySelector('.gpu-catalog-sidebar-panel');
            if (sidebarPanel && sidebarPanel.contains(e.target)) return;
            // Clicked outside panel.
            closeMobileFilters();
        });

        let lastY = window.scrollY || 0;
        let raf = 0;
        window.addEventListener('scroll', () => {
            if (!mobileToolbarEl) return;
            if (!isMobileLayout()) return;
            if (document.body.classList.contains('gpu-mobile-filters-open')) return;
            if (raf) return;
            raf = window.requestAnimationFrame(() => {
                raf = 0;
                const y = window.scrollY || 0;
                const d = y - lastY;
                if (d > 12) mobileToolbarEl.classList.add('is-hidden');
                else if (d < -12) mobileToolbarEl.classList.remove('is-hidden');
                lastY = y;
            });
        }, { passive: true });

        window.addEventListener('resize', () => {
            if (!isMobileLayout()) {
                closeMobileFilters();
                return;
            }
        });

        initPriceRangeBounds();
        syncRangesFromPriceInputs();
        if (!isMobileLayout()) closeMobileFilters();
        apply();
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderPreview();
        renderFullCatalog();
    });
})();
