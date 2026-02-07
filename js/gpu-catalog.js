/* GPU catalog page logic (filters/sort/grid).
   Shared card UI lives in js/gpu-ui.js as window.GPU_UI.
   Data source: window.GPU_CATALOG (see js/gpu-catalog-data.js). */
(function () {
    const data = Array.isArray(window.GPU_CATALOG) ? window.GPU_CATALOG : [];

    function renderFullCatalog() {
        const host = document.getElementById('gpu-grid');
        if (!host) return;

        const ui = window.GPU_UI;
        if (!ui || typeof ui.renderCard !== 'function' || typeof ui.wireCardClicks !== 'function') {
            console.warn('[gpu-catalog] GPU_UI is missing. Load js/gpu-ui.js before js/gpu-catalog.js.');
            return;
        }

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
        ui.wireCardClicks(host);

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
	            const dataMin = prices.length ? Math.min(...prices) : 0;
	            const dataMax = prices.length ? Math.max(...prices) : 0;

	            // Step: "half a million" increments for a cleaner UX.
	            const step = 500_000;
	            const floorToStep = (n) => Math.floor(n / step) * step;
	            const ceilToStep = (n) => Math.ceil(n / step) * step;

	            // Use actual min/max from cards.
	            const minBound = Math.max(0, floorToStep(dataMin || 0));
	            const maxBound = Math.max(minBound + step, ceilToStep(dataMax || step));

	            priceMinRangeEl.min = String(minBound);
	            priceMinRangeEl.max = String(maxBound);
	            priceMinRangeEl.step = String(step);
	            priceMaxRangeEl.min = String(minBound);
	            priceMaxRangeEl.max = String(maxBound);
	            priceMaxRangeEl.step = String(step);

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
	            // "Empty" means "not set": keep inputs blank when thumbs are at bounds.
	            if (priceMinEl) priceMinEl.value = minV !== lo ? formatIntSpaced(minV) : '';
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
                && window.matchMedia('(max-width: 1023px)').matches;
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
	            const typeSel = readMulti('gpu-type');
	            const gasSel = readMulti('gpu-gas');
	            const execSel = readMulti('gpu-exec');
	            const industrySel = readMulti('gpu-industry');
	            const nominalSel = readMulti('gpu-power-nom');
	            const continuousSel = readMulti('gpu-power-cont');

	            if (typeSel.length) n++;
	            if (gasSel.length) n++;
	            if (execSel.length) n++;
	            if (industrySel.length) n++;
	            if (nominalSel.length) n++;
	            if (continuousSel.length) n++;
	            if (readNum(priceMinEl) !== null || readNum(priceMaxEl) !== null) n++;
	            return n;
	        }

	        function apply() {
	            const typeSel = readMulti('gpu-type');
	            const gasSel = readMulti('gpu-gas');
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

	            if (typeSel.length && !(typeSel.includes('base') && typeSel.includes('mod'))) {
	                list = list.filter((x) => {
	                    const tags = Array.isArray(x.tags) ? x.tags : [];
	                    if (typeSel.includes('base')) return !tags.includes('модифицированная');
	                    if (typeSel.includes('mod')) return tags.includes('модифицированная');
	                    return true;
	                });
	            }

	            if (gasSel.length && !(gasSel.includes('apg') && gasSel.includes('pipe_ng') && gasSel.includes('var'))) {
	                list = list.filter((x) => {
	                    const tags = Array.isArray(x.tags) ? x.tags : [];
	                    const specs = x && x.specs ? x.specs : {};
	                    const hay = `${x.matrix_name || ''} ${x.display_name || ''} ${Object.values(specs).join(' ')}`.toLowerCase();
	                    return gasSel.some((gas) => {
	                        if (gas === 'apg') return tags.includes('пнг');
	                        if (gas === 'pipe_ng') return !tags.includes('пнг');
	                        if (gas === 'var') return tags.includes('пнг') || tags.includes('модифицированная') || /перемен/i.test(hay);
	                        return true;
	                    });
	                });
	            }

	            if (execSel.length) {
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

	            if (industrySel.length) {
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

	            if (nominalSel.length) {
	                const set = new Set(nominalSel.map((x) => Number(x)).filter((x) => Number.isFinite(x)));
	                if (set.size) list = list.filter((x) => set.has(Number(x.nominal_kw)));
	            }

	            if (continuousSel.length) {
	                const set = new Set(continuousSel.map((x) => Number(x)).filter((x) => Number.isFinite(x)));
	                if (set.size) list = list.filter((x) => set.has(Number(x.continuous_kw)));
	            }

	            if (priceMin !== null || priceMax !== null) {
	                list = list.filter((x) => {
	                    const p = getItemPriceRub(x);
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

            host.innerHTML = list.map((item) => ui.renderCard(item)).join('');

            if (countEl) countEl.textContent = `Позиции: ${list.length}`;

            if (mobileBadgeEl) {
                const k = activeFiltersCount();
                mobileBadgeEl.textContent = String(k);
                mobileBadgeEl.style.display = k > 0 ? 'inline-flex' : 'none';
            }
        }

	        if (controlsEl) {
	            controlsEl.addEventListener('change', (e) => {
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

	                setChecked('gpu-sort', 'popular');

	                const uncheckAll = (name) => {
	                    Array.from(document.querySelectorAll(`input[name="${name}"]`))
	                        .forEach((x) => { x.checked = false; });
	                };

	                // Type / Gas: empty means "all / any" implicitly.
	                uncheckAll('gpu-type');
	                uncheckAll('gpu-gas');

	                // Multi groups: empty means "any" implicitly.
	                uncheckAll('gpu-exec');
	                uncheckAll('gpu-industry');
	                uncheckAll('gpu-power-nom');
	                uncheckAll('gpu-power-cont');

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
        renderFullCatalog();
    });
})();
