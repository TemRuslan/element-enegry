const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Попытка найти системный Chrome
function findChromePath() {
    const possiblePaths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        '/Applications/Chromium.app/Contents/MacOS/Chromium'
    ];
    
    for (const chromePath of possiblePaths) {
        if (fs.existsSync(chromePath)) {
            return chromePath;
        }
    }
    return null;
}

async function convertToPDF() {
    let browser;
    
    try {
        console.log('🚀 Запуск Playwright...');
        
        const chromePath = findChromePath();
        const launchOptions = {
            headless: true
        };
        
        if (chromePath) {
            launchOptions.executablePath = chromePath;
            console.log(`Используем системный Chrome: ${chromePath}`);
        }
        
        // Запускаем браузер
        browser = await chromium.launch(launchOptions);

        const page = await browser.newPage();
        
        // Устанавливаем размер viewport
        await page.setViewportSize({
            width: 1920,
            height: 1080
        });

        // Получаем абсолютный путь к HTML файлу
        const htmlPath = path.join(__dirname, 'presentation.html');
        const fileUrl = `file://${htmlPath}`;
        
        console.log(`📄 Открываем файл: ${fileUrl}?print-pdf`);
        
        // Открываем страницу с параметром print-pdf
        await page.goto(`${fileUrl}?print-pdf`, {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        // Ждем загрузки шрифтов
        console.log('⏳ Ожидание загрузки шрифтов...');
        await page.evaluate(() => document.fonts.ready);
        
        // Ждем загрузки всех элементов
        await page.waitForSelector('.slide', { timeout: 30000 });
        
        // Принудительно применяем стили печати
        await page.evaluate(() => {
            document.body.classList.add('print-pdf');
        });
        
        // Дополнительное время для рендеринга
        console.log('⏳ Рендеринг контента...');
        await page.waitForTimeout(3000);
        
        // Убеждаемся, что все изображения загружены
        await page.evaluate(() => {
            return Promise.all(
                Array.from(document.images)
                    .filter(img => !img.complete)
                    .map(img => new Promise(resolve => {
                        img.onload = img.onerror = resolve;
                    }))
            );
        });

        // Генерируем PDF
        const pdfPath = path.join(__dirname, 'presentation.pdf');
        console.log('📄 Создание PDF...');
        
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            },
            preferCSSPageSize: false,
            displayHeaderFooter: false
        });

        console.log(`✅ PDF успешно создан: ${pdfPath}`);
    } catch (error) {
        console.error('❌ Ошибка при создании PDF:', error);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

convertToPDF();
