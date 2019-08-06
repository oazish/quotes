const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const util = require('util');
const { Writable, Readable, Transform, pipeline } = require('stream');

GATSBY_DEVELOP_URL = 'http://localhost:8000';

+async function main() {
  const quotesDir = path.join(__dirname, '../src/quotes');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1024, height: 1024 });

  for (quoteFile of await fs.readdir(quotesDir)) {
    const quoteId = quoteFile.split('.')[0];
    // const quoteId = '3';
    const outputFile = path.join(
      __dirname,
      `../src/assets/images/overlays/quotes/${quoteId}.jpg`,
    );
    await page.goto(
      url.resolve(GATSBY_DEVELOP_URL, `overlay/quotes/${quoteId}`),
    );
    await page.screenshot({ path: outputFile });
    console.log(`Generated screenshot for quote #${quoteId}.`);
  }
  await browser.close();
}();
