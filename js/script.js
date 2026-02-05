// HTML компоненты
const headerHTML = `
    <!-- МЕНЮ -->
    <div class="nav-container">
        <nav class="glass-nav">
            <a href="#" class="logo shrink-0" style="display: flex; align-items: center; gap: 12px; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: #f8fafc; text-decoration: none; text-transform: uppercase;">
                <div class="logo-icon" style="width: 32px; height: 32px; background: linear-gradient(135deg, #0ea5e9, #0284c7); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);">
                    <i class="fas fa-bolt text-sm"></i>
                </div>
                <div style="line-height: 1; white-space: nowrap;">ЭЛЕМЕНТ <span style="color: #0ea5e9;">ЭНЕРГИЯ</span></div>
            </a>

            <div class="hidden lg:flex nav-links">
                <div class="dropdown-wrapper">
                    <div class="dropdown-trigger">Продукция <i class="fas fa-chevron-down text-[9px]"></i></div>
                    <div class="dropdown-content">
                        <a href="#products" class="dropdown-item"><i class="fas fa-microchip"></i> ГПУ 150-500 кВт</a>
                        <a href="#products" class="dropdown-item"><i class="fas fa-box"></i> Контейнерные ГПУ</a>
                        <a href="#products" class="dropdown-item"><i class="fas fa-tools"></i> Запчасти Weichai</a>
                    </div>
                </div>

                <div class="dropdown-wrapper">
                    <div class="dropdown-trigger">Услуги <i class="fas fa-chevron-down text-[9px]"></i></div>
                    <div class="dropdown-content">
                        <a href="#services-full" class="dropdown-item"><i class="fas fa-hammer"></i> Весь спектр услуг</a>
                        <a href="#services-full" class="dropdown-item"><i class="fas fa-sync"></i> Сервисное ТО 24/7</a>
                        <a href="#services-full" class="dropdown-item"><i class="fas fa-chart-line"></i> Энергоаудит</a>
                    </div>
                </div>

                <div class="dropdown-wrapper">
                    <div class="dropdown-trigger">Отрасли <i class="fas fa-chevron-down text-[9px]"></i></div>
                    <div class="dropdown-content">
                        <a href="#industries" class="dropdown-item"><i class="fas fa-industry"></i> Промышленность</a>
                        <a href="#industries" class="dropdown-item"><i class="fas fa-oil-well"></i> Нефтегаз</a>
                        <a href="#industries" class="dropdown-item"><i class="fas fa-microchip"></i> Майнинг</a>
                        <a href="#industries" class="dropdown-item"><i class="fas fa-seedling"></i> Агропром</a>
                        <a href="#industries" class="dropdown-item"><i class="fas fa-server"></i> Дата-центры</a>
                    </div>
                </div>

                <a href="#production">Производство</a>
                <a href="#contacts">Контакты</a>

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
                        <hr class="border-white/10 my-1">
                        <button onclick="window.location.href='#contacts'" class="btn-primary w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest text-white">
                            Получить КП
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex lg:hidden items-center gap-4">
                <button class="text-2xl text-slate-300" onclick="document.getElementById('mobile-menu').classList.toggle('active')">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <div id="mobile-menu">
                <a href="#products" class="text-white font-bold">Продукция</a>
                <a href="#services-full" class="text-white font-bold">Услуги</a>
                <a href="#industries" class="text-white font-bold">Отрасли</a>
                <a href="#production" class="text-white font-bold">Производство</a>
                <a href="#contacts" class="text-white font-bold">Контакты</a>
                <div class="h-[1px] bg-white/10 w-full my-2"></div>
                <a href="tel:+78000000000" class="text-accent font-bold">+7 (800) 000-00-00</a>
            </div>
        </nav>
    </div>
`;

const footerHTML = `
    <!-- FOOTER -->
    <footer class="py-12 border-t border-white/5 text-center">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="font-black uppercase tracking-tighter">ЭЛЕМЕНТ <span class="text-accent">ЭНЕРГИЯ</span> © 2024</div>
                <div class="flex gap-8">
                    <a href="#" class="text-xs text-slate-500 hover:text-white transition">Политика конфиденциальности</a>
                    <a href="#" class="text-xs text-slate-500 hover:text-white transition">Документация</a>
                </div>
                <div class="flex gap-4">
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition"><i class="fab fa-telegram"></i></a>
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
        </div>
    </footer>
`;

// Загрузка header и footer при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

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
        textElement.style.color = 'white';
        arrowElement.style.color = 'white';
        arrowElement.style.transform = ''; // Убираем смещение
    }
}

function scrollServices(direction) {
    const container = document.getElementById('services-scroll');
    const cardWidth = container.querySelector('.service-slide-card').offsetWidth;
    const scrollAmount = cardWidth + 24; // Ширина карточки + gap

    if(direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}