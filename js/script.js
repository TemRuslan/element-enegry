// HTML компоненты
const headerHTML = `
		    <!-- МЕНЮ -->
		    <header class="nav-container">
		        <nav class="glass-nav">
		            <div class="nav-inner max-w-7xl mx-auto px-6">
		            <a href="index.html" class="logo shrink-0">
		                <img src="assets/brand/logo.png" alt="Элемент Энергия" style="height: 36px; width: auto; display: block;">
		                <div style="line-height: 1; white-space: nowrap;">ЭЛЕМЕНТ <span style="color: #0ea5e9;">ЭНЕРГИЯ</span></div>
		            </a>

				            <div class="hidden lg:flex nav-links">
				                <a href="about/index.html">О нас</a>
				                <div class="dropdown-wrapper">
			                    <div class="dropdown-trigger">Продукция <i class="fas fa-chevron-down text-[9px]"></i></div>
					                    <div class="dropdown-content">
					                        <a href="products/overview.html" class="dropdown-item"><i class="fas fa-layer-group"></i> Вся продукция</a>
					                        <a href="products/index.html" class="dropdown-item"><i class="fas fa-list"></i> Каталог ГПУ</a>
					                        <a href="products/gpu-250-210/index.html" class="dropdown-item"><i class="fas fa-bolt"></i> ГПУ 250 кВт (210 пост.)</a>
					                        <a href="industries/neftegaz/ngpu.html" class="dropdown-item"><i class="fas fa-oil-well"></i> ГПУ 250 кВт для ПНГ</a>
					                        <a href="products/mining-container/index.html" class="dropdown-item"><i class="fas fa-box"></i> Контейнер для майнинга (ГПУ + полки ASIC)</a>
					                        <a href="products/spare-parts/index.html" class="dropdown-item"><i class="fas fa-gears"></i> Запчасти</a>
					                        <a href="products/radiators-drycoolers/index.html" class="dropdown-item"><i class="fas fa-fan"></i> Радиаторы и драй-куллеры</a>
					                        <a href="products/gpu-containers/index.html" class="dropdown-item"><i class="fas fa-boxes-stacked"></i> Контейнеры для ГПУ</a>
				                    </div>
				                </div>

			                <div class="dropdown-wrapper">
			                    <div class="dropdown-trigger">Услуги <i class="fas fa-chevron-down text-[9px]"></i></div>
				                    <div class="dropdown-content">
					                        <a href="industries/promyshlennost/proizvodstvo.html" class="dropdown-item"><i class="fas fa-bolt"></i> Энергосервис</a>
					                        <a href="industries/promyshlennost/index.html#energycenter" class="dropdown-item"><i class="fas fa-industry"></i> Энергоцентры под ключ</a>
					                        <a href="industries/promyshlennost/index.html#operation" class="dropdown-item"><i class="fas fa-screwdriver-wrench"></i> Эксплуатация и сервис 24/7</a>
					                        <a href="services/index.html#site" class="dropdown-item"><i class="fas fa-location-dot"></i> Поиск участка</a>
					                        <a href="services/index.html#gas" class="dropdown-item"><i class="fas fa-gas-pump"></i> Подведение газа</a>
					                        <a href="services/index.html#tu" class="dropdown-item"><i class="fas fa-file-signature"></i> ТУ на газ</a>
					                        <a href="services/index.html#predesign" class="dropdown-item"><i class="fas fa-compass-drafting"></i> Предпроектные работы</a>
					                        <a href="services/index.html#design" class="dropdown-item"><i class="fas fa-drafting-compass"></i> Проектирование энергоцентра</a>
					                        <a href="services/index.html#kod" class="dropdown-item"><i class="fas fa-temperature-half"></i> КОД (СУТ)</a>
					                        <a href="services/overview.html" class="dropdown-item"><i class="fas fa-arrow-right"></i> Все услуги</a>
					                    </div>
					                </div>

				                <div class="dropdown-wrapper">
					                    <div class="dropdown-trigger">Отрасли <i class="fas fa-chevron-down text-[9px]"></i></div>
						                    <div class="dropdown-content">
						                        <a href="industries/index.html" class="dropdown-item"><i class="fas fa-layer-group"></i> Все отрасли</a>
						                        <a href="industries/promyshlennost/index.html" class="dropdown-item"><i class="fas fa-industry"></i> Промышленность</a>
						                        <a href="industries/promyshlennost/proizvodstvo.html" class="dropdown-item dropdown-subitem"><i class="fas fa-bolt"></i> Энергия для производства</a>
		                        <a href="industries/neftegaz/index.html" class="dropdown-item"><i class="fas fa-oil-well"></i> Нефтегаз</a>
						                        <a href="industries/neftegaz/ngpu.html" class="dropdown-item dropdown-subitem"><i class="fas fa-fire-flame-simple"></i> ГПУ 250 кВт (ПНГ)</a>
						                        <a href="industries/neftegaz/index.html" class="dropdown-item dropdown-subitem"><i class="fas fa-tower-observation"></i> Энергоснабжение месторождений</a>
							                        <a href="industries/mining/index.html" class="dropdown-item"><i class="fas fa-microchip"></i> Майнинг</a>
							                        <a href="industries/mining/index.html#gpu" class="dropdown-item dropdown-subitem"><i class="fas fa-microchip"></i> ГПУ для майнинга</a>
							                        <a href="industries/mining/index.html#container" class="dropdown-item dropdown-subitem"><i class="fas fa-box"></i> Контейнер + полки ASIC</a>
							                        <a href="industries/mining/index.html#home" class="dropdown-item dropdown-subitem"><i class="fas fa-house"></i> Домашний майнинг</a>
							                        <a href="industries/agroprom/index.html" class="dropdown-item"><i class="fas fa-seedling"></i> Агропром</a>
							                        <a href="industries/agroprom/index.html#poultry" class="dropdown-item dropdown-subitem"><i class="fas fa-drumstick-bite"></i> Птицефабрики</a>
							                        <a href="industries/agroprom/index.html#greenhouse" class="dropdown-item dropdown-subitem"><i class="fas fa-leaf"></i> Теплицы</a>
							                        <a href="industries/zhkh/index.html" class="dropdown-item"><i class="fas fa-city"></i> ЖКХ</a>
							                        <a href="industries/datacenters/index.html" class="dropdown-item"><i class="fas fa-server"></i> Дата-центры</a>
							                        <a href="industries/datacenters/index.html#reserve-500" class="dropdown-item dropdown-subitem"><i class="fas fa-plug-circle-bolt"></i> Резерв 500 кВт</a>
							                        <a href="industries/datacenters/index.html#reserve-1mw" class="dropdown-item dropdown-subitem"><i class="fas fa-plug-circle-bolt"></i> Резерв 1 МВт</a>
							                        <a href="industries/datacenters/index.html#reserve-2mw" class="dropdown-item dropdown-subitem"><i class="fas fa-plug-circle-bolt"></i> Резерв 2 МВт</a>
							                        <a href="industries/datacenters/index.html#main-1mw" class="dropdown-item dropdown-subitem"><i class="fas fa-bolt"></i> Основной 1 МВт</a>
							                        <a href="industries/datacenters/index.html#main-5mw" class="dropdown-item dropdown-subitem"><i class="fas fa-bolt"></i> Основной 5 МВт</a>
							                    </div>
							                </div>
							                <a href="projects/index.html">Проекты</a>
							                <a href="blog/index.html">Блог</a>
							                <a href="leasing/index.html">Лизинг</a>
							                <a href="contacts/index.html">Контакты</a>

	                <div class="dropdown-wrapper contact-wrapper">
	                    <div class="dropdown-trigger contact-link">
	                        Связаться <i class="fas fa-chevron-down text-[10px]"></i>
	                    </div>
		                    <div class="dropdown-content">
	                        <a href="tel:+78000000000" class="dropdown-item">
	                            <i class="fas fa-phone"></i> +7 (800) 000-00-00
	                        </a>
	                        <a href="mailto:info@element.energy" class="dropdown-item">
	                            <i class="fas fa-envelope"></i> info@element.energy
	                        </a>
		                        <hr class="border-slate-900/10 my-1">
			                        <button onclick="window.location.href='index.html#contacts'" class="btn-primary w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest text-white">
		                            Получить КП
		                        </button>
		                    </div>
		                </div>
		            </div>
	
		            <div class="flex lg:hidden items-center gap-4">
		                <button class="text-2xl text-slate-700" onclick="toggleMobileMenu()">
		                    <i class="fas fa-bars"></i>
		                </button>
		            </div>
		
											            <div id="mobile-menu" class="mobile-menu">
											                <a href="about/index.html" class="mobile-menu-link">О нас</a>

											                <button class="mobile-acc-toggle" type="button" aria-expanded="false" aria-controls="mobile-products" data-mobile-acc="mobile-products">
											                    <span>Продукция</span>
											                    <i class="fas fa-chevron-down text-[10px]"></i>
											                </button>
											                <div id="mobile-products" class="mobile-acc-panel" hidden>
											                    <a href="products/overview.html" class="mobile-menu-link">Вся продукция</a>
											                    <a href="products/index.html" class="mobile-menu-link">Каталог ГПУ</a>
											                    <a href="products/gpu-250-210/index.html" class="mobile-menu-link">ГПУ 250 кВт (210 пост.)</a>
											                    <a href="industries/neftegaz/ngpu.html" class="mobile-menu-link">ГПУ 250 кВт (ПНГ)</a>
											                    <a href="products/mining-container/index.html" class="mobile-menu-link">Контейнер для майнинга (ГПУ + полки ASIC)</a>
											                    <a href="products/spare-parts/index.html" class="mobile-menu-link">Запчасти</a>
											                    <a href="products/radiators-drycoolers/index.html" class="mobile-menu-link">Радиаторы и драй-куллеры</a>
											                    <a href="products/gpu-containers/index.html" class="mobile-menu-link">Контейнеры для ГПУ</a>
											                </div>

											                <button class="mobile-acc-toggle" type="button" aria-expanded="false" aria-controls="mobile-services" data-mobile-acc="mobile-services">
											                    <span>Услуги</span>
											                    <i class="fas fa-chevron-down text-[10px]"></i>
											                </button>
											                <div id="mobile-services" class="mobile-acc-panel" hidden>
											                    <a href="industries/promyshlennost/proizvodstvo.html" class="mobile-menu-link">Энергосервис</a>
											                    <a href="industries/promyshlennost/index.html#energycenter" class="mobile-menu-link">Энергоцентры под ключ</a>
											                    <a href="industries/promyshlennost/index.html#operation" class="mobile-menu-link">Эксплуатация 24/7</a>
											                    <a href="services/index.html#site" class="mobile-menu-link">Поиск участка</a>
											                    <a href="services/index.html#gas" class="mobile-menu-link">Подведение газа</a>
											                    <a href="services/index.html#tu" class="mobile-menu-link">ТУ на газ</a>
											                    <a href="services/index.html#predesign" class="mobile-menu-link">Предпроектные работы</a>
											                    <a href="services/index.html#design" class="mobile-menu-link">Проектирование</a>
											                    <a href="services/index.html#kod" class="mobile-menu-link">КОД (СУТ)</a>
											                    <a href="services/overview.html" class="mobile-menu-link">Все услуги</a>
											                </div>

											                <button class="mobile-acc-toggle" type="button" aria-expanded="false" aria-controls="mobile-industries" data-mobile-acc="mobile-industries">
											                    <span>Отрасли</span>
											                    <i class="fas fa-chevron-down text-[10px]"></i>
											                </button>
												                <div id="mobile-industries" class="mobile-acc-panel" hidden>
												                    <a href="industries/index.html" class="mobile-menu-link">Все отрасли</a>
												                    <div class="mobile-acc-row">
												                        <a href="industries/promyshlennost/index.html" class="mobile-menu-link">Промышленность</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-industrial" data-mobile-acc="mobile-industry-industrial">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-industrial" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="industries/promyshlennost/proizvodstvo.html" class="mobile-menu-link mobile-subitem">Энергия для производства</a>
												                    </div>
	
												                    <div class="mobile-acc-row">
												                        <a href="industries/neftegaz/index.html" class="mobile-menu-link">Нефтегаз</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-oilgas" data-mobile-acc="mobile-industry-oilgas">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-oilgas" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="industries/neftegaz/ngpu.html" class="mobile-menu-link mobile-subitem">ГПУ 250 кВт (ПНГ)</a>
												                        <a href="industries/neftegaz/index.html" class="mobile-menu-link mobile-subitem">Энергоснабжение месторождений</a>
												                    </div>
	
												                    <div class="mobile-acc-row">
												                        <a href="industries/mining/index.html" class="mobile-menu-link">Майнинг</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-mining" data-mobile-acc="mobile-industry-mining">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-mining" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="industries/mining/index.html#gpu" class="mobile-menu-link mobile-subitem">ГПУ для майнинга</a>
												                        <a href="industries/mining/index.html#container" class="mobile-menu-link mobile-subitem">Контейнер + полки ASIC</a>
												                        <a href="industries/mining/index.html#home" class="mobile-menu-link mobile-subitem">Домашний майнинг</a>
												                    </div>
	
												                    <div class="mobile-acc-row">
												                        <a href="industries/agroprom/index.html" class="mobile-menu-link">Агропром</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-agro" data-mobile-acc="mobile-industry-agro">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-agro" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="industries/agroprom/index.html#poultry" class="mobile-menu-link mobile-subitem">Птицефабрики</a>
												                        <a href="industries/agroprom/index.html#greenhouse" class="mobile-menu-link mobile-subitem">Теплицы</a>
												                    </div>
	
												                    <a href="industries/zhkh/index.html" class="mobile-menu-link">ЖКХ</a>
	
												                    <div class="mobile-acc-row">
												                        <a href="industries/datacenters/index.html" class="mobile-menu-link">Дата-центры</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-dc" data-mobile-acc="mobile-industry-dc">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-dc" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="industries/datacenters/index.html#reserve-500" class="mobile-menu-link mobile-subitem">Резерв 500 кВт</a>
												                        <a href="industries/datacenters/index.html#reserve-1mw" class="mobile-menu-link mobile-subitem">Резерв 1 МВт</a>
												                        <a href="industries/datacenters/index.html#reserve-2mw" class="mobile-menu-link mobile-subitem">Резерв 2 МВт</a>
												                        <a href="industries/datacenters/index.html#main-1mw" class="mobile-menu-link mobile-subitem">Основной 1 МВт</a>
												                        <a href="industries/datacenters/index.html#main-5mw" class="mobile-menu-link mobile-subitem">Основной 5 МВт</a>
												                    </div>
													                </div>

												                <a href="projects/index.html" class="mobile-menu-link">Проекты</a>
												                <a href="blog/index.html" class="mobile-menu-link">Блог</a>
												                <a href="leasing/index.html" class="mobile-menu-link">Лизинг</a>
												                <a href="contacts/index.html" class="mobile-menu-link">Контакты</a>

											                <div class="h-[1px] bg-slate-900/10 w-full my-2"></div>
											                <a href="tel:+78000000000" class="text-accent font-bold mobile-menu-link">+7 (800) 000-00-00</a>
											            </div>
		            </div>
	        </nav>
		    </header>
`;

const footerHTML = `
			    <!-- FOOTER -->
			    <footer class="py-12 border-t border-slate-900/10 text-center bg-white/50 backdrop-blur-md">
		        <div class="max-w-7xl mx-auto px-6">
		            <div class="flex flex-col md:flex-row justify-between items-start gap-8 text-left">
		                <div>
		                    <div class="font-black uppercase tracking-tighter text-slate-900">ЭЛЕМЕНТ <span class="text-accent">ЭНЕРГИЯ</span></div>
		                    <div class="text-xs text-slate-600 mt-2 uppercase tracking-wider">Работаем с 2016 года</div>
		                </div>
		                <div class="text-sm text-slate-800 space-y-1">
		                    <div class="font-bold uppercase text-xs tracking-widest text-slate-500">Контакты</div>
		                    <div><a class="hover:text-accent transition" href="tel:+78000000000">+7 (800) 000-00-00</a></div>
		                    <div><a class="hover:text-accent transition" href="mailto:info@element.energy">info@element.energy</a></div>
		                </div>
		                <div class="text-sm text-slate-800 space-y-1">
		                    <div class="font-bold uppercase text-xs tracking-widest text-slate-500">Реквизиты</div>
		                    <div>ООО Element</div>
		                    <div>ИНН 0000000000</div>
		                    <div>КПП 000000000</div>
		                    <div>ОГРН 0000000000000</div>
		                </div>
		            </div>
		        </div>
				    </footer>
		`;

	function ensureBreadcrumbs() {
	    const body = document.body;
	    if (!body) return;
	    if (body.dataset && body.dataset.breadcrumbs === 'off') return;

	    const getSiteRelPath = () => {
	        let p = String(location.pathname || '');
	        if (location.protocol === 'file:') {
	            const marker = '/gkee.ru/';
	            const idx = p.lastIndexOf(marker);
	            if (idx >= 0) p = p.slice(idx + marker.length);
	        }
	        p = p.replace(/^\/+/, '');
	        return p;
	    };

	    const relPath = getSiteRelPath();
	    const isHome = relPath === '' || relPath === 'index.html';
	    if (isHome) return;

	    const existing = document.querySelector('ol[aria-label="breadcrumbs"]');

	    const normalizeExisting = (ol) => {
	        if (!ol) return;

        let wrapper = ol.closest('nav');
        if (!wrapper) {
            wrapper = document.createElement('nav');
            const parent = ol.parentNode;
            if (parent) parent.insertBefore(wrapper, ol);
            wrapper.appendChild(ol);
        }

        wrapper.classList.add('ui-breadcrumbs');
        // Existing blog/project pages used `pb-8` in the breadcrumbs nav; we unify spacing via CSS.
        wrapper.classList.remove('pb-8');
        ol.classList.add('ui-breadcrumbs__list');

        ol.querySelectorAll('a[href]').forEach((a) => a.classList.add('ui-breadcrumbs__link'));
        ol.querySelectorAll('li').forEach((li) => {
            const isSep =
                li.getAttribute('aria-hidden') === 'true' ||
                String(li.textContent || '').trim() === '/';
            if (isSep) li.classList.add('ui-breadcrumbs__sep');
        });
    };

	    if (existing) {
	        normalizeExisting(existing);
	        return;
	    }

	    const parsePathInfo = (p) => {
	        const s = String(p || '');
	        if (!s) return { dirParts: [], file: '', isIndex: true };

	        if (s.endsWith('/')) {
	            const dirParts = s.split('/').filter(Boolean);
	            return { dirParts, file: '', isIndex: true };
	        }

	        const parts = s.split('/').filter(Boolean);
	        if (parts.length === 0) return { dirParts: [], file: '', isIndex: true };
	        const last = parts[parts.length - 1];
	        if (last === 'index.html') {
	            return { dirParts: parts.slice(0, -1), file: last, isIndex: true };
	        }
	        return { dirParts: parts.slice(0, -1), file: last, isIndex: false };
	    };

	    const getTitleFromDocumentTitle = () => {
	        const t = String(document.title || '').trim();
	        if (!t) return '';
	        const beforePipe = t.split('|')[0];
	        return String(beforePipe || '').trim();
    };

    const getTitleFromH1 = () => {
        const h1 = document.querySelector('h1');
        const t = h1 ? String(h1.textContent || '').trim() : '';
        return t;
    };

	    const currentLabel =
	        getTitleFromDocumentTitle() ||
	        getTitleFromH1() ||
	        'Страница';

	    const { dirParts, file, isIndex } = parsePathInfo(relPath);
	    const section = String(dirParts[0] || '');

	    const industryLabels = {
	        promyshlennost: 'Промышленность',
	        neftegaz: 'Нефтегаз',
	        mining: 'Майнинг',
	        agroprom: 'Агропром',
	        zhkh: 'ЖКХ',
	        datacenters: 'Дата-центры',
	    };

	    const isBlogArticle = Boolean(body.getAttribute('data-article')) || (section === 'blog' && !isIndex);
	    const isProjectCase = Boolean(body.getAttribute('data-project')) || (section === 'projects' && !isIndex);

	    const crumbs = [];
	    crumbs.push({ text: 'Главная', href: 'index.html' });

	    if (section === 'industries') {
	        const category = { text: 'Отрасль', href: 'industries/index.html' };
	        const industryKey = String(dirParts[1] || '');
	        const industryLabel = industryLabels[industryKey] || (industryKey ? currentLabel : '');

	        if (!industryKey) {
	            // /industries/index.html
	            crumbs.push({ text: 'Отрасль' });
	        } else if (isIndex && dirParts.length === 2) {
	            // /industries/<industry>/index.html
	            crumbs.push(category);
	            crumbs.push({ text: industryLabel || currentLabel });
	        } else {
	            // /industries/<industry>/<page>.html
	            crumbs.push(category);
	            crumbs.push({
	                text: industryLabel || industryKey,
	                href: `industries/${industryKey}/index.html`,
	            });
	            crumbs.push({ text: currentLabel });
	        }
	    } else if (section === 'blog') {
	        if (isBlogArticle) {
	            crumbs.push({ text: 'Блог', href: 'blog/index.html' });
	            crumbs.push({ text: currentLabel, id: 'articleBreadcrumbTitle' });
	        } else {
	            crumbs.push({ text: 'Блог' });
	        }
	    } else if (section === 'projects') {
	        if (isProjectCase) {
	            crumbs.push({ text: 'Проекты', href: 'projects/index.html' });
	            crumbs.push({ text: currentLabel, id: 'projectBreadcrumbTitle' });
	        } else {
	            crumbs.push({ text: 'Проекты' });
	        }
	    } else if (section === 'services') {
	        if (isIndex && dirParts.length === 1) {
	            crumbs.push({ text: 'Услуги' });
	        } else {
	            crumbs.push({ text: 'Услуги', href: 'services/index.html' });
	            crumbs.push({ text: currentLabel });
	        }
	    } else if (section === 'about') {
	        if (isIndex && dirParts.length === 1) {
	            crumbs.push({ text: 'О нас' });
	        } else {
	            crumbs.push({ text: 'О нас', href: 'about/index.html' });
	            crumbs.push({ text: currentLabel });
	        }
	    } else if (section === 'products') {
	        const category = { text: 'Продукция', href: 'products/index.html' };
	        const productKey = String(dirParts[1] || '');

	        if (!productKey) {
	            crumbs.push({ text: 'Продукция' });
	        } else if (isIndex && dirParts.length === 2) {
	            crumbs.push(category);
	            crumbs.push({ text: currentLabel });
	        } else {
	            crumbs.push(category);
	            crumbs.push({ text: productKey, href: `products/${productKey}/index.html` });
	            crumbs.push({ text: currentLabel });
	        }
	    } else if (section === 'contacts') {
	        if (isIndex && dirParts.length === 1) {
	            crumbs.push({ text: 'Контакты' });
	        } else {
	            crumbs.push({ text: 'Контакты', href: 'contacts/index.html' });
	            crumbs.push({ text: currentLabel });
	        }
	    } else if (section === 'leasing') {
	        if (isIndex && dirParts.length === 1) {
	            crumbs.push({ text: 'Лизинг' });
	        } else {
	            crumbs.push({ text: 'Лизинг', href: 'leasing/index.html' });
	            crumbs.push({ text: currentLabel });
	        }
	    } else {
	        if (isBlogArticle) {
	            crumbs.push({ text: 'Блог', href: 'blog/index.html' });
	            crumbs.push({ text: currentLabel, id: 'articleBreadcrumbTitle' });
	        } else if (isProjectCase) {
	            crumbs.push({ text: 'Проекты', href: 'projects/index.html' });
	            crumbs.push({ text: currentLabel, id: 'projectBreadcrumbTitle' });
	        } else {
	            crumbs.push({ text: currentLabel });
	        }
	    }

    const buildNav = ({ withContainer, topPadding }) => {
        const nav = document.createElement('nav');
        nav.classList.add('ui-breadcrumbs');
        if (topPadding) {
            nav.classList.add('pt-24', 'lg:pt-20');
        }

        const ol = document.createElement('ol');
        ol.setAttribute('aria-label', 'breadcrumbs');
        ol.classList.add('ui-breadcrumbs__list');

        crumbs.forEach((c, idx) => {
            if (idx > 0) {
                const sep = document.createElement('li');
                sep.setAttribute('aria-hidden', 'true');
                sep.classList.add('ui-breadcrumbs__sep');
                sep.textContent = '/';
                ol.appendChild(sep);
            }

            const li = document.createElement('li');
            if (c.id) li.id = c.id;

            if (c.href) {
                const a = document.createElement('a');
                a.href = c.href;
                a.classList.add('ui-breadcrumbs__link');
                a.textContent = c.text;
                li.appendChild(a);
            } else {
                li.textContent = c.text;
            }

            ol.appendChild(li);
        });

        if (withContainer) {
            const container = document.createElement('div');
            container.className = 'max-w-7xl mx-auto px-6';
            container.appendChild(ol);
            nav.appendChild(container);
        } else {
            nav.appendChild(ol);
        }

        return nav;
    };

    const h1 = document.querySelector('h1');
    if (h1 && h1.parentNode) {
        const nav = buildNav({ withContainer: false, topPadding: false });
        h1.parentNode.insertBefore(nav, h1);
        return;
    }

    const pageLight = document.querySelector('.page-light');
    if (pageLight) {
        const main = pageLight.querySelector('main');
        const nav = buildNav({ withContainer: true, topPadding: true });
        if (main && main.parentNode === pageLight) {
            pageLight.insertBefore(nav, main);
        } else {
            const lastBlob =
                pageLight.querySelector('.bg-blob.blob-2') ||
                pageLight.querySelector('.bg-blob');
            if (lastBlob && lastBlob.parentNode === pageLight) {
                pageLight.insertBefore(nav, lastBlob.nextSibling);
            } else {
                pageLight.insertBefore(nav, pageLight.firstChild);
            }
        }
        return;
    }

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder && headerPlaceholder.parentNode) {
        const nav = buildNav({ withContainer: true, topPadding: true });
        headerPlaceholder.parentNode.insertBefore(nav, headerPlaceholder.nextSibling);
        return;
    }
}

	// Загрузка header и footer при загрузке страницы
	document.addEventListener('DOMContentLoaded', function () {
	    document.getElementById('header-placeholder').innerHTML = headerHTML;
	    document.getElementById('footer-placeholder').innerHTML = footerHTML;
	    ensureBreadcrumbs();

    // Header behavior:
    // - Header is always overlay (position: fixed) to avoid layout shift on scroll.
    // - Background alpha fades in smoothly during the first N pixels of scroll.
    const nav = document.querySelector('.nav-container');
    if (nav) {
        const FADE_PX = 160;
        const ALPHA_TOP = 1.0;
        const ALPHA_END = 0.72;

        const clamp01 = (x) => {
            if (x < 0) return 0;
            if (x > 1) return 1;
            return x;
        };

        let raf = 0;
        let lastAlpha = null; // string, rounded (to skip redundant style updates)

        const applyAlpha = () => {
            raf = 0;
            const y = window.scrollY || 0;
            const t = clamp01(y / FADE_PX);
            const alpha = ALPHA_TOP + (ALPHA_END - ALPHA_TOP) * t;
            const a = alpha.toFixed(3);
            if (a === lastAlpha) return;
            lastAlpha = a;
            document.documentElement.style.setProperty('--nav-bg-alpha', a);
        };

        const schedule = () => {
            if (raf) return;
            raf = window.requestAnimationFrame(applyAlpha);
        };

        // Initial paint + scroll updates.
        applyAlpha();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule, { passive: true });
    }

    // Запуск анимаций счетчиков
    animatePriceCounter();
    animateGasCounter();
    animateUptimeCounter();
});

function resetMobileAccordions() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    menu.querySelectorAll('[data-mobile-acc]').forEach((btn) => {
        btn.setAttribute('aria-expanded', 'false');
        const panelId = btn.getAttribute('data-mobile-acc');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) panel.hidden = true;
    });
}

function wireMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    // Accordion toggles
    menu.querySelectorAll('[data-mobile-acc]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const panelId = btn.getAttribute('data-mobile-acc');
            const panel = panelId ? document.getElementById(panelId) : null;
            if (!panel) return;

            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            panel.hidden = expanded;
        });
    });

    // Close menu after navigating.
    menu.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
            menu.classList.remove('active');
            resetMobileAccordions();
        });
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    const willOpen = !menu.classList.contains('active');
    if (willOpen) resetMobileAccordions();
    menu.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', wireMobileMenu);

// Анимация счетчика цены
function animatePriceCounter() {
    const counterElement = document.getElementById('price-counter');
    if (!counterElement) return;

    let currentPrice = 6.0;
    const targetPrice = 2.5;
    const duration = 1000; // 1 секунда
    const steps = 60; // 60 кадров для плавности
    const decrement = (currentPrice - targetPrice) / steps;
    let step = 0;

    const interval = setInterval(() => {
        currentPrice -= decrement;
        step++;

        if (currentPrice <= targetPrice || step >= steps) {
            currentPrice = targetPrice;
            clearInterval(interval);
        }

        counterElement.textContent = `от ${currentPrice.toFixed(1).replace('.', ',')} ₽`;
    }, duration / steps);
}

// Анимация счетчика потребления газа (снижение от 0,32 до 0,25)
function animateGasCounter() {
    const counterElement = document.getElementById('gas-counter');
    if (!counterElement) return;

    let currentValue = 0.32;
    const targetValue = 0.25;
    const duration = 1000; // 1 секунда
    const steps = 60; // 60 кадров для плавности
    const decrement = (currentValue - targetValue) / steps;
    let step = 0;

    const interval = setInterval(() => {
        currentValue -= decrement;
        step++;

        if (currentValue <= targetValue || step >= steps) {
            currentValue = targetValue;
            clearInterval(interval);
        }

        counterElement.textContent = `от ${currentValue.toFixed(2).replace('.', ',')} м³`;
    }, duration / steps);
}

// Анимация счетчика аптайма (увеличение от 80% до 98%)
function animateUptimeCounter() {
    const counterElement = document.getElementById('uptime-counter');
    if (!counterElement) return;

    let currentValue = 80;
    const targetValue = 99;
    const duration = 1000; // 1 секунда
    const steps = 60; // 60 кадров для плавности
    const increment = (targetValue - currentValue) / steps;
    let step = 0;

    const interval = setInterval(() => {
        currentValue += increment;
        step++;

        if (currentValue >= targetValue || step >= steps) {
            currentValue = targetValue;
            clearInterval(interval);
        }

        counterElement.textContent = `${Math.round(currentValue)}% Аптайм`;
    }, duration / steps);
}

function changeColor(isHover) {
    const iconElement = document.getElementById('leasing-icon');
    const textElement = document.getElementById('leasing-text');
    const arrowElement = document.getElementById('leasing-arrow');

    if (isHover) {
        iconElement.style.color = '#0ea5e9'; // Синий цвет
        textElement.style.color = '#0ea5e9'; // Синий цвет
        arrowElement.style.color = '#0ea5e9'; // Синий цвет
        arrowElement.style.transform = 'translateX(4px)'; // Смещение стрелки вправо
    } else {
        // Убираем inline стили, чтобы элементы вернулись к своим CSS классам
        iconElement.style.color = '';
        textElement.style.color = '';
        arrowElement.style.color = '';
        arrowElement.style.transform = ''; // Убираем смещение
    }
}

function scrollServices(direction) {
    const container = document.getElementById('services-scroll');
    const cardWidth = container.querySelector('.service-slide-card').offsetWidth;
    const scrollAmount = cardWidth + 24; // Ширина карточки + gap

    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
