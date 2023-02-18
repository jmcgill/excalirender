const express = require('express');
const app = express();
const path = require('path');
const puppeteer = require("puppeteer");
const stream = require('stream');

app.use(express.json())

app.get('/test', async (req, res) => {
    res.send('OK TEST');
});

app.get('/download', async (req, res) => {
    console.log('This is something');
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
    await page.click('#render_button');

    let element = await page.$('#img');
    let value = await element.evaluate(el => el.textContent);
    // await new Promise(r => setTimeout(r, 30000));

    const imageBuffer = await page.screenshot({
        type: 'png',
        quality: 100,
        // omitBackground: true,
    });

    browser.close();

    // const matches = value.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    // const imageData = matches[2];
    // const buffer = Buffer.from(imageData, 'base64');

    var readStream = new stream.PassThrough();
    readStream.end(buffer);

    // response.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-Type', 'image/x-png');
    readStream.pipe(res);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});