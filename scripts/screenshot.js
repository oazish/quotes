const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const url = require('url');

GATSBY_DEVELOP_URL = 'http://localhost:8000';

+async function main() {
  const quotes_dir = path.join(__dirname, '../src/quotes');
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    page.setViewport({ width: 800, height: 800 });

    for (const quote_file of await fs.readdir(quotes_dir)) {
      const quote_id = quote_file.split('.')[0];
      const output_file = `screenshots/quote-${quote_id}.jpg`;
      // const contents = await
      //   fs.readFile(path.join(quotes_dir, quote_file), 'utf8');
      await page.goto(url.resolve(GATSBY_DEVELOP_URL, `overlay/quotes/${quote_id}`));
      await page.screenshot({ path: output_file });
      console.log(`Generated ${output_file}.`);

      // await getContent(
      //   `${GATSBY_DEVELOP_URL}/overlay/quotes/${quote_file.split('.')[0]}`);
      // http
      //   .request({ hostname: 'localhost', port: 8000 }, res => {
      //     //if (res.)
      //   })
      //   .on('error', e => {
      //     console.error(
      //       `Cannot access ${GATSBY_DEVELOP_URL}. Please make sure the Gatsby`,
      //       `development server is started.`,
      //       e,
      //     );
      //   });
    }

  } finally {
    await browser.close();
  }
}();

async function main() {}

/**
 * Taken from https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/.
 */
function getContent(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
    })
};