const express = require('express');
const app = express();
const path = require('path');
const puppeteer = require("puppeteer");
const stream = require('stream');
const LRUCache = require('lru-cache')

app.use(express.json())

const options = {
    max: 500,

    // 256 MB Cache
    maxSize: 256 * 1025 * 1024,

    sizeCalculation: (value, key) => {
        return value.length;
    },

    // how long to live in ms
    // ttl: 1000 * 60 * 5,

    // allowStale: false,
    // updateAgeOnGet: false,
    // updateAgeOnHas: false,

    // async method to use for cache.fetch(), for
    // stale-while-revalidate type of behavior
    // fetchMethod: async (key, staleValue, { options, signal }) => {},
}

const cache = new LRUCache(options)

app.post('/render', async (req, res) => {
    const key = JSON.stringify(req.body);
    const result = cache.get(key);
    if (result) {
        const buffer = Buffer.from(result, 'base64');
        const readStream = new stream.PassThrough();
        readStream.end(buffer);
        res.set('Content-Type', 'image/x-png');
        readStream.pipe(res);
    }

    // const dataUrl = req.params.dataUrl;
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', "--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true,
        // headless: false
    });
    const page = await browser.newPage();
    await page.goto('file://' + path.join(__dirname, 'index.html'));

    await page.evaluate((d) => document.querySelector("#data_input").value = d, JSON.stringify(req.body));
    await page.type('#data_input', ' ');

    // Give content a moment to load
    await new Promise(r => setTimeout(r, 10));
    await page.click('.scroll-back-to-content');
    await page.evaluateHandle('document.fonts.ready');
    await page.click('#render_button');

    let element = await page.$('#img');
    let value = await element.evaluate(el => el.textContent);

    browser.close();

    const matches = value.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const imageData = matches[2];
    const buffer = Buffer.from(imageData, 'base64');

    cache.set(key, buffer.toString('base64'));

    const readStream = new stream.PassThrough();
    readStream.end(buffer);

    // response.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-Type', 'image/x-png');
    readStream.pipe(res);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});