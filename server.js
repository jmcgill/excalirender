const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const puppeteer = require("puppeteer");
const stream = require('stream');

app.get('/test', async (req, res) => {
    res.send('OK TEST');

});

app.get('/download', async (req, res) => {
    console.log('This is something');
    // const dataUrl = req.params.dataUrl;
    const browser = await puppeteer.launch({ args: ['--no-sandbox', "--disable-setuid-sandbox"] });
    // const page = await browser.newPage();
    // await page.goto('http://google.com');
    res.send('OK Heroku');
    // await page.goto('file:///Users/jmcgill/src/excalirender/index.html');
    // await page.click('#render_button');
    //
    // let element = await page.$('#img');
    // let value = await element.evaluate(el => el.textContent);
    //
    // browser.close();
    //
    // const matches = value.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // // const imageExtension = matches[1].split('/')[1];
    // const imageData = matches[2];
    // const buffer = Buffer.from(imageData, 'base64');
    // // const filename = `${Date.now()}.${imageExtension}`;
    // // var fileContents = Buffer.from(fileData, "base64");
    //
    // var readStream = new stream.PassThrough();
    // readStream.end(buffer);
    //
    // // response.set('Content-disposition', 'attachment; filename=' + fileName);
    // res.set('Content-Type', 'image/x-png');
    // readStream.pipe(res);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});