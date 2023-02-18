const puppeteer = require('puppeteer');

(async function main () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file:///Users/jmcgill/src/excalirender/index.html');
    await page.click('#render_button');
    await page.screenshot({path: 'screenshot.png'});
    browser.close();
})();