const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIST_DIR = path.join(__dirname, 'dist');
const OUTPUT_DIR = path.join(__dirname, 'screenshots');
const PORT = 4180;

function startServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url.split('?')[0]);
    if (filePath.endsWith(path.sep) || (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory())) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Static server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Home View
    console.log('Capturing 01-desktop-home.png...');
    await page.setViewport({ width: 1440, height: 1024, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01-desktop-home.png'), fullPage: false });

    // 2. Filter Modal View
    console.log('Capturing 05-advanced-filters.png...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const filterBtn = btns.find(b => b.textContent.includes('فیلترها'));
      if (filterBtn) filterBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05-advanced-filters.png') });

    // Reload page to clean state for PDP
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    // 3. Product Detail Page (PDP)
    console.log('Capturing 02-property-detail.png...');
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.figma-card-shadow'));
      if (cards.length > 0) cards[0].click();
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02-property-detail.png'), fullPage: false });

    // 4. Booking & Invoice Page
    console.log('Capturing 03-reserve-invoice.png...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const reserveBtn = btns.find(b => b.textContent.includes('ثبت رزرو'));
      if (reserveBtn) reserveBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-reserve-invoice.png'), fullPage: false });

    // 5. Mobile App Simulator View
    console.log('Capturing 04-mobile-app-simulator.png...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 1200, height: 1100, deviceScaleFactor: 2 });
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const mobBtn = btns.find(b => b.textContent.includes('شبیه‌ساز موبایل'));
      if (mobBtn) mobBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-mobile-app-simulator.png') });

    console.log('All 5 screenshots captured successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
