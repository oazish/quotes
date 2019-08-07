const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const { SHAREABLE_IMAGE_DIMENSIONS } = require('../src/utils/shared');

GATSBY_DEVELOP_URL = 'http://localhost:8000';

+async function main() {
  const quotesDir = path.join(__dirname, '../src/quotes');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport(SHAREABLE_IMAGE_DIMENSIONS);

  for (quoteFile of await fs.readdir(quotesDir)) {
    const quoteId = quoteFile.split('.')[0];
    const outputFile = path.join(
      __dirname,
      `../src/assets/images/overlays/quotes/${quoteId}.jpg`,
    );
    await page.goto(
      url.resolve(GATSBY_DEVELOP_URL, `overlay/quotes/${quoteId}`),
    );
    await page.waitForSelector('br[hidden][data-page-loaded]');
    await page.screenshot({ path: outputFile });
    console.log(`Generated screenshot for quote #${quoteId}.`);
  }
  await browser.close();
}();
