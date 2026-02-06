/* MSP Leasing page:
   - Lightweight calculator (informational only).
   - FAQ accordion toggles.
   No external dependencies. */
(function () {
    const nf = new Intl.NumberFormat('ru-RU');

    function clamp(n, min, max) {
        n = Number.isFinite(n) ? n : min;
        return Math.max(min, Math.min(max, n));
    }

    function parseMoney(text) {
        // Keep digits only to accept "5 000 000" / "5,000,000" etc.
        const digits = String(text || '').replace(/[^\d]/g, '');
        if (!digits) return 0;
        return Number(digits);
    }

    function formatMoney(n) {
        return nf.format(Math.round(n)) + ' ₽';
    }

    function calc() {
        const priceEl = document.getElementById('lease-price');
        const originEl = document.getElementById('lease-origin');
        const advanceEl = document.getElementById('lease-advance');
        const termEl = document.getElementById('lease-term');

        const monthlyEl = document.getElementById('lease-monthly');
        const overpayEl = document.getElementById('lease-overpay');
        const overpayHintEl = document.getElementById('lease-overpay-hint');
        const costEl = document.getElementById('lease-cost');
        const totalEl = document.getElementById('lease-total');

        if (!priceEl || !originEl || !advanceEl || !termEl) return;
        if (!monthlyEl || !overpayEl || !overpayHintEl || !costEl || !totalEl) return;

        const price = clamp(parseMoney(priceEl.value), 500000, 50000000);
        const advancePct = clamp(Number(advanceEl.value), 0, 99);
        const termMonths = clamp(Number(termEl.value), 1, 120);

        const annualRate = originEl.value === 'foreign' ? 0.08 : 0.06;
        const years = termMonths / 12;

        const advanceAmt = price * (advancePct / 100);
        const financed = Math.max(0, price - advanceAmt);

        // "Udorozhanie" is often presented as a proportional add-on vs. financed amount.
        // Here we keep it simple: overpay = financed * annual_rate * years.
        const overpay = financed * annualRate * years;
        const leaseCost = financed + overpay; // sum of payments excluding advance
        const monthly = leaseCost / termMonths;
        const total = leaseCost + advanceAmt; // total incl. advance (equals price + overpay)

        monthlyEl.textContent = formatMoney(monthly);
        overpayEl.textContent = formatMoney(overpay);
        costEl.textContent = formatMoney(leaseCost);
        totalEl.textContent = formatMoney(total);

        const totalUdorPct = price > 0 ? (overpay / price) * 100 : 0;
        overpayHintEl.textContent = `Удорожание на весь срок: ${totalUdorPct.toFixed(1).replace('.', ',')}%`;
    }

    function wireCalculator() {
        const priceEl = document.getElementById('lease-price');
        const originEl = document.getElementById('lease-origin');
        const advanceEl = document.getElementById('lease-advance');
        const termEl = document.getElementById('lease-term');
        if (!priceEl || !originEl || !advanceEl || !termEl) return;

        // Live re-calc.
        [originEl, advanceEl, termEl].forEach((el) => {
            el.addEventListener('input', calc);
            el.addEventListener('change', calc);
        });

        // On blur, normalize money formatting.
        priceEl.addEventListener('blur', () => {
            const price = clamp(parseMoney(priceEl.value), 500000, 50000000);
            priceEl.value = nf.format(price);
            calc();
        });
        priceEl.addEventListener('input', () => {
            // Don't format while typing; just recalc.
            calc();
        });

        calc();
    }

    function wireAccordion() {
        const btns = Array.from(document.querySelectorAll('[data-acc-btn]'));
        if (!btns.length) return;

        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const root = btn.closest('.glass-card');
                if (!root) return;
                const panel = root.querySelector('[data-acc-panel]');
                const icon = btn.querySelector('[data-acc-icon]');
                if (!panel) return;

                const isOpen = !panel.classList.contains('hidden');

                // Close all others for cleanliness.
                btns.forEach((otherBtn) => {
                    const otherRoot = otherBtn.closest('.glass-card');
                    const otherPanel = otherRoot && otherRoot.querySelector('[data-acc-panel]');
                    const otherIcon = otherBtn.querySelector('[data-acc-icon]');
                    if (!otherPanel) return;
                    otherPanel.classList.add('hidden');
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                });

                if (!isOpen) {
                    panel.classList.remove('hidden');
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                } else {
                    panel.classList.add('hidden');
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        wireCalculator();
        wireAccordion();
    });
})();

