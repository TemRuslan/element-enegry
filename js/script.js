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
				                <a href="production.html">О нас</a>
				                <div class="dropdown-wrapper">
			                    <div class="dropdown-trigger">Продукция <i class="fas fa-chevron-down text-[9px]"></i></div>
					                    <div class="dropdown-content">
					                        <a href="catalog.html" class="dropdown-item"><i class="fas fa-list"></i> Каталог ГПУ</a>
					                        <a href="gpu-250-210.html" class="dropdown-item"><i class="fas fa-bolt"></i> ГПУ 250 кВт (210 пост.)</a>
					                        <a href="ngpu.html" class="dropdown-item"><i class="fas fa-oil-well"></i> ГПУ 250 кВт для ПНГ</a>
				                    </div>
				                </div>

			                <div class="dropdown-wrapper">
			                    <div class="dropdown-trigger">Услуги <i class="fas fa-chevron-down text-[9px]"></i></div>
				                    <div class="dropdown-content">
					                        <a href="proizvodstvo.html" class="dropdown-item"><i class="fas fa-bolt"></i> Энергосервис</a>
					                        <a href="promyshlennost.html#energycenter" class="dropdown-item"><i class="fas fa-industry"></i> Энергоцентры под ключ</a>
					                        <a href="promyshlennost.html#operation" class="dropdown-item"><i class="fas fa-screwdriver-wrench"></i> Эксплуатация и сервис 24/7</a>
					                        <a href="services.html#site" class="dropdown-item"><i class="fas fa-location-dot"></i> Поиск участка</a>
					                        <a href="services.html#gas" class="dropdown-item"><i class="fas fa-gas-pump"></i> Подведение газа</a>
					                        <a href="services.html#tu" class="dropdown-item"><i class="fas fa-file-signature"></i> ТУ на газ</a>
					                        <a href="services.html#predesign" class="dropdown-item"><i class="fas fa-compass-drafting"></i> Предпроектные работы</a>
					                        <a href="services.html#design" class="dropdown-item"><i class="fas fa-drafting-compass"></i> Проектирование энергоцентра</a>
					                        <a href="services.html#kod" class="dropdown-item"><i class="fas fa-temperature-half"></i> КОД (СУТ)</a>
					                        <a href="services.html" class="dropdown-item"><i class="fas fa-arrow-right"></i> Все услуги</a>
					                    </div>
					                </div>

				                <div class="dropdown-wrapper">
					                    <div class="dropdown-trigger">Отрасли <i class="fas fa-chevron-down text-[9px]"></i></div>
						                    <div class="dropdown-content">
						                        <a href="promyshlennost.html" class="dropdown-item"><i class="fas fa-industry"></i> Промышленность</a>
						                        <a href="proizvodstvo.html" class="dropdown-item dropdown-subitem"><i class="fas fa-bolt"></i> Энергия для производства</a>
						                        <a href="index.html#industries" class="dropdown-item"><i class="fas fa-oil-well"></i> Нефтегаз</a>
						                        <a href="ngpu.html" class="dropdown-item dropdown-subitem"><i class="fas fa-fire-flame-simple"></i> ГПУ 250 кВт (ПНГ)</a>
						                        <a href="neftegaz.html" class="dropdown-item dropdown-subitem"><i class="fas fa-tower-observation"></i> Энергоснабжение месторождений</a>
							                        <a href="mining.html" class="dropdown-item"><i class="fas fa-microchip"></i> Майнинг</a>
							                        <a href="mining.html#gpu" class="dropdown-item dropdown-subitem"><i class="fas fa-microchip"></i> ГПУ для майнинга</a>
							                        <a href="mining.html#container" class="dropdown-item dropdown-subitem"><i class="fas fa-box"></i> Контейнер + полки ASIC</a>
							                        <a href="mining.html#home" class="dropdown-item dropdown-subitem"><i class="fas fa-house"></i> Домашний майнинг</a>
							                        <a href="agroprom.html" class="dropdown-item"><i class="fas fa-seedling"></i> Агропром</a>
							                        <a href="agroprom.html#poultry" class="dropdown-item dropdown-subitem"><i class="fas fa-drumstick-bite"></i> Птицефабрики</a>
							                        <a href="agroprom.html#greenhouse" class="dropdown-item dropdown-subitem"><i class="fas fa-leaf"></i> Теплицы</a>
							                        <a href="zhkh.html" class="dropdown-item"><i class="fas fa-city"></i> ЖКХ</a>
							                        <a href="datacenters.html" class="dropdown-item"><i class="fas fa-server"></i> Дата-центры</a>
							                        <a href="datacenters.html#reserve-500" class="dropdown-item dropdown-subitem"><i class="fas fa-plug-circle-bolt"></i> Резерв 500 кВт</a>
							                        <a href="datacenters.html#reserve-1mw" class="dropdown-item dropdown-subitem"><i class="fas fa-plug-circle-bolt"></i> Резерв 1 МВт</a>
							                        <a href="datacenters.html#reserve-2mw" class="dropdown-item dropdown-subitem"><i class="fas fa-plug-circle-bolt"></i> Резерв 2 МВт</a>
							                        <a href="datacenters.html#main-1mw" class="dropdown-item dropdown-subitem"><i class="fas fa-bolt"></i> Основной 1 МВт</a>
							                        <a href="datacenters.html#main-5mw" class="dropdown-item dropdown-subitem"><i class="fas fa-bolt"></i> Основной 5 МВт</a>
						                    </div>
						                </div>
						                <a href="projects.html">Проекты</a>
						                <a href="leasing.html">Лизинг</a>
						                <a href="contacts.html">Контакты</a>

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
											                <a href="production.html" class="mobile-menu-link">О нас</a>

											                <button class="mobile-acc-toggle" type="button" aria-expanded="false" aria-controls="mobile-products" data-mobile-acc="mobile-products">
											                    <span>Продукция</span>
											                    <i class="fas fa-chevron-down text-[10px]"></i>
											                </button>
											                <div id="mobile-products" class="mobile-acc-panel" hidden>
											                    <a href="catalog.html" class="mobile-menu-link">Каталог ГПУ</a>
											                    <a href="gpu-250-210.html" class="mobile-menu-link">ГПУ 250 кВт (210 пост.)</a>
											                    <a href="ngpu.html" class="mobile-menu-link">ГПУ 250 кВт (ПНГ)</a>
											                </div>

											                <button class="mobile-acc-toggle" type="button" aria-expanded="false" aria-controls="mobile-services" data-mobile-acc="mobile-services">
											                    <span>Услуги</span>
											                    <i class="fas fa-chevron-down text-[10px]"></i>
											                </button>
											                <div id="mobile-services" class="mobile-acc-panel" hidden>
											                    <a href="proizvodstvo.html" class="mobile-menu-link">Энергосервис</a>
											                    <a href="promyshlennost.html#energycenter" class="mobile-menu-link">Энергоцентры под ключ</a>
											                    <a href="promyshlennost.html#operation" class="mobile-menu-link">Эксплуатация 24/7</a>
											                    <a href="services.html#site" class="mobile-menu-link">Поиск участка</a>
											                    <a href="services.html#gas" class="mobile-menu-link">Подведение газа</a>
											                    <a href="services.html#tu" class="mobile-menu-link">ТУ на газ</a>
											                    <a href="services.html#predesign" class="mobile-menu-link">Предпроектные работы</a>
											                    <a href="services.html#design" class="mobile-menu-link">Проектирование</a>
											                    <a href="services.html#kod" class="mobile-menu-link">КОД (СУТ)</a>
											                    <a href="services.html" class="mobile-menu-link">Все услуги</a>
											                </div>

											                <button class="mobile-acc-toggle" type="button" aria-expanded="false" aria-controls="mobile-industries" data-mobile-acc="mobile-industries">
											                    <span>Отрасли</span>
											                    <i class="fas fa-chevron-down text-[10px]"></i>
											                </button>
												                <div id="mobile-industries" class="mobile-acc-panel" hidden>
												                    <div class="mobile-acc-row">
												                        <a href="promyshlennost.html" class="mobile-menu-link">Промышленность</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-industrial" data-mobile-acc="mobile-industry-industrial">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-industrial" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="proizvodstvo.html" class="mobile-menu-link mobile-subitem">Энергия для производства</a>
												                    </div>
	
												                    <div class="mobile-acc-row">
												                        <a href="neftegaz.html" class="mobile-menu-link">Нефтегаз</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-oilgas" data-mobile-acc="mobile-industry-oilgas">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-oilgas" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="ngpu.html" class="mobile-menu-link mobile-subitem">ГПУ 250 кВт (ПНГ)</a>
												                        <a href="neftegaz.html" class="mobile-menu-link mobile-subitem">Энергоснабжение месторождений</a>
												                    </div>
	
												                    <div class="mobile-acc-row">
												                        <a href="mining.html" class="mobile-menu-link">Майнинг</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-mining" data-mobile-acc="mobile-industry-mining">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-mining" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="mining.html#gpu" class="mobile-menu-link mobile-subitem">ГПУ для майнинга</a>
												                        <a href="mining.html#container" class="mobile-menu-link mobile-subitem">Контейнер + полки ASIC</a>
												                        <a href="mining.html#home" class="mobile-menu-link mobile-subitem">Домашний майнинг</a>
												                    </div>
	
												                    <div class="mobile-acc-row">
												                        <a href="agroprom.html" class="mobile-menu-link">Агропром</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-agro" data-mobile-acc="mobile-industry-agro">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-agro" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="agroprom.html#poultry" class="mobile-menu-link mobile-subitem">Птицефабрики</a>
												                        <a href="agroprom.html#greenhouse" class="mobile-menu-link mobile-subitem">Теплицы</a>
												                    </div>
	
												                    <a href="zhkh.html" class="mobile-menu-link">ЖКХ</a>
	
												                    <div class="mobile-acc-row">
												                        <a href="datacenters.html" class="mobile-menu-link">Дата-центры</a>
												                        <button class="mobile-acc-subtoggle" type="button" aria-expanded="false" aria-controls="mobile-industry-dc" data-mobile-acc="mobile-industry-dc">
												                            <i class="fas fa-chevron-down text-[10px]"></i>
												                        </button>
												                    </div>
												                    <div id="mobile-industry-dc" class="mobile-acc-panel mobile-acc-panel--nested" hidden>
												                        <a href="datacenters.html#reserve-500" class="mobile-menu-link mobile-subitem">Резерв 500 кВт</a>
												                        <a href="datacenters.html#reserve-1mw" class="mobile-menu-link mobile-subitem">Резерв 1 МВт</a>
												                        <a href="datacenters.html#reserve-2mw" class="mobile-menu-link mobile-subitem">Резерв 2 МВт</a>
												                        <a href="datacenters.html#main-1mw" class="mobile-menu-link mobile-subitem">Основной 1 МВт</a>
												                        <a href="datacenters.html#main-5mw" class="mobile-menu-link mobile-subitem">Основной 5 МВт</a>
												                    </div>
												                </div>

											                <a href="projects.html" class="mobile-menu-link">Проекты</a>
											                <a href="leasing.html" class="mobile-menu-link">Лизинг</a>
											                <a href="contacts.html" class="mobile-menu-link">Контакты</a>

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

// Загрузка header и footer при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

    // Header behavior:
    // - At the top: header is `position: sticky` and does NOT overlap content.
    // - On scroll: add `.is-fixed` to make it `position: fixed`, so it overlays content.
    const nav = document.querySelector('.nav-container');
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 0) nav.classList.add('is-fixed');
            else nav.classList.remove('is-fixed');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
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
