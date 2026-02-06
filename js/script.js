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
	                <button class="text-2xl text-slate-700" onclick="document.getElementById('mobile-menu').classList.toggle('active')">
	                    <i class="fas fa-bars"></i>
	                </button>
	            </div>
	
										            <div id="mobile-menu">
										                <a href="production.html" class="text-slate-900 font-bold">О нас</a>
										                <a href="catalog.html" class="text-slate-900 font-bold">Каталог ГПУ</a>
										                <a href="gpu-250-210.html" class="text-slate-900 font-bold">ГПУ 250 кВт (210 пост.)</a>
										                <a href="services.html" class="text-slate-900 font-bold">Услуги</a>
										                <a href="projects.html" class="text-slate-900 font-bold">Проекты</a>
										                <a href="ngpu.html" class="text-slate-900 font-bold">ГПУ 250 кВт для ПНГ</a>
											                <a href="promyshlennost.html" class="text-slate-900 font-bold">Промышленность</a>
												                <a href="proizvodstvo.html" class="text-slate-900 font-bold mobile-subitem">Энергия для производства</a>
											                <a href="index.html#industries" class="text-slate-900 font-bold">Отрасли</a>
											                <a href="neftegaz.html" class="text-slate-900 font-bold mobile-subitem">Нефтегаз: энергоснабжение</a>
											                <a href="mining.html" class="text-slate-900 font-bold mobile-subitem">Майнинг</a>
											                <a href="agroprom.html" class="text-slate-900 font-bold mobile-subitem">Агропром</a>
											                <a href="zhkh.html" class="text-slate-900 font-bold mobile-subitem">ЖКХ</a>
											                <a href="datacenters.html" class="text-slate-900 font-bold mobile-subitem">Дата-центры</a>
											                <a href="leasing.html" class="text-slate-900 font-bold">Лизинг</a>
											                <a href="contacts.html" class="text-slate-900 font-bold">Контакты</a>
											                <div class="h-[1px] bg-slate-900/10 w-full my-2"></div>
											                <a href="tel:+78000000000" class="text-accent font-bold">+7 (800) 000-00-00</a>
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
