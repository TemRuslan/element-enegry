/* Contacts page: Yandex map init with safe fallback (no API key required in code).
   If the API fails to load (e.g., key required), we show a simple fallback with links. */
(function () {
    const locations = {
        moscow: { name: 'Офис Москва', lat: 55.7495, lon: 37.5372 },
        yoshkar: { name: 'Завод Йошкар-Ола', lat: 56.6322, lon: 47.8731 }
    };

    function yandexMapsLink(loc) {
        const p = locations[loc];
        const ll = `${p.lon},${p.lat}`;
        return `https://yandex.ru/maps/?ll=${encodeURIComponent(ll)}&z=15&pt=${encodeURIComponent(ll)},pm2rdm`;
    }

    function wireFallbackLinks() {
        const fallback = document.getElementById('contacts-map-fallback');
        if (!fallback) return;

        fallback.querySelectorAll('[data-open]').forEach((a) => {
            const loc = a.getAttribute('data-open');
            a.setAttribute('href', yandexMapsLink(loc));
        });
    }

    function showFallback() {
        wireFallbackLinks();
        const el = document.getElementById('contacts-map-fallback');
        if (el) el.hidden = false;
    }

    function initMap() {
        const mapHost = document.getElementById('yandex-map');
        if (!mapHost) return;

        if (!window.ymaps || !window.ymaps.ready) {
            showFallback();
            return;
        }

        window.ymaps.ready(() => {
            let map;
            try {
                map = new window.ymaps.Map('yandex-map', {
                    center: [56.0, 42.0],
                    zoom: 6,
                    controls: ['zoomControl', 'fullscreenControl']
                });
            } catch (e) {
                showFallback();
                return;
            }

            const moscowPin = new window.ymaps.Placemark(
                [locations.moscow.lat, locations.moscow.lon],
                {
                    balloonContent: '<strong>Элемент Энергия</strong><br>Офис в Москве<br>Пресненская наб. 12',
                    hintContent: 'Штаб-квартира'
                },
                { preset: 'islands#blueDotIconWithCaption' }
            );

            const yoshkarPin = new window.ymaps.Placemark(
                [locations.yoshkar.lat, locations.yoshkar.lon],
                {
                    balloonContent: '<strong>Элемент Энергия</strong><br>Завод и склад<br>ул. Машиностроителей 101',
                    hintContent: 'Производство'
                },
                { preset: 'islands#blueFactoryIcon' }
            );

            map.geoObjects.add(moscowPin).add(yoshkarPin);

            if (window.innerWidth < 768) {
                map.behaviors.disable('scrollZoom');
            }

            document.querySelectorAll('[data-zoom]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const loc = btn.getAttribute('data-zoom');
                    const p = locations[loc];
                    if (!p) return;
                    map.setCenter([p.lat, p.lon], 15, {
                        checkZoomRange: true,
                        duration: 800
                    });
                });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', initMap);
})();

