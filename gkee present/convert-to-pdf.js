const puppeteer = require('puppeteer');
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
    const chromePath = findChromePath();
    const launchOptions = {
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-crash-reporter',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-crashpad'
        ]
    };
    
    if (chromePath) {
        launchOptions.executablePath = chromePath;
        console.log(`Используем системный Chrome: ${chromePath}`);
    }
    
    const browser = await puppeteer.launch(launchOptions);

    try {
        const page = await browser.newPage();
        
        // Получаем абсолютный путь к HTML файлу
        const htmlPath = path.join(__dirname, 'presentation.html');
        const fileUrl = `file://${htmlPath}`;
        
        console.log(`Открываем файл: ${fileUrl}?print-pdf`);
        
        // Устанавливаем размер viewport
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 2
        });

        // Открываем страницу с параметром print-pdf
        await page.goto(`${fileUrl}?print-pdf`, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Ждем загрузки шрифтов
        await page.evaluateHandle(() => document.fonts.ready);
        
        // Ждем полной загрузки всех элементов
        await page.waitForSelector('.slide', { timeout: 30000 });
        
        // Дополнительное время для рендеринга всех элементов
        await page.waitForTimeout(5000);
        
        // Принудительно применяем стили печати
        await page.evaluate(() => {
            document.body.classList.add('print-pdf');
        });
        
        // Еще немного ждем для применения стилей
        await page.waitForTimeout(2000);
        
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

        // Генерируем PDF с улучшенными настройками
        const pdfPath = path.join(__dirname, 'presentation.pdf');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            landscape: true,
            printBackground: true,
            preferCSSPageSize: false,
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            },
            displayHeaderFooter: false,
            scale: 1.0
        });

        console.log(`✅ PDF успешно создан: ${pdfPath}`);
    } catch (error) {
        console.error('❌ Ошибка при создании PDF:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

convertToPDF();
