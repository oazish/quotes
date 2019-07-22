const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const util = require('util');
const { Writable, Readable, Transform, pipeline } = require('stream');

GATSBY_DEVELOP_URL = 'http://localhost:8000';

+async function main() {
  const quotesDir = path.join(__dirname, '../src/quotes');
  const quotesFiles = await fs.readdir(quotesDir);

  const MAX_BOTTLENECK_SIZE = 5;
  const active = 0;
  //const active workers.

  for (const work of [1,2,3,4,5,6,7,8,9,10]) {
    if (active < MAX_BOTTLENECK_SIZE) {
      active++;
      // Schedule browser.
      setTimeout(--active) // and somehow need to "wake up" parent.
    } else {
      
    }
  }


  return;

  const readableStream = new Readable({ objectMode: true });
  readableStream._read = () => {};
  quotesFiles.forEach(x => console.log(readableStream.push(x)));
  readableStream.push(null);
  const screenshotStream = new ScreenshotStream();
  // const screenshotStream = new Writable({
  //   write(quoteFile, _encoding, callback) {
  //     console.log(`${quoteFile}: omg`);
  //     callback();
  //     // setTimeout(callback, 1000);
  //   }
  // });

  // const bottleneckStream = new Transform({
  //   transform(obj, _encoding, callback) {
  //     callback(null, obj);
  //   },
  //   objectMode: true,
  //   highWaterMark: 5,
  // });

  try {
    await util.promisify(pipeline)(
      readableStream,
      //bottleneckStream,
      screenshotStream,
    );
    console.log('Done');

  } catch (e) {
    console.error(e);
  }
}();

const MAX_BROWSERS = 2;

class ScreenshotStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true, highWaterMark: MAX_BROWSERS });
    this.freeBrowsers = new Map();
    this.busyBrowsers = new Map();
  }

  async _write(quoteFile, _encoding, callback) {
    try {
      const log = (...args) => console.log(`${quoteFile}:`, ...args);

      if (!this.freeBrowsers.size) {
        this.freeBrowsers.set(
          this.busyBrowsers.size,
          await puppeteer.launch(),
        );
        log(`New browser created: ${this.busyBrowsers.size}`);
      }

      callback();
      const [browserKey, browser] = this.freeBrowsers.entries().next().value;
      move_map_entry(browserKey, this.freeBrowsers, this.busyBrowsers);
      log(`Moved free browser ${browserKey} to busy browsers.`);

      // Move browser from free to busy.
      this.freeBrowsers.delete(browserKey);
      this.freeBrowsers.set(browserKey, browser);

      // Do work.
      // await new Promise(res => setTimeout(res, 1000));
      const page = await browser.newPage();
      const quoteId = quoteFile.split('.')[0];
      const outputFile = `screenshots/quote-${quoteId}.jpg`;
      page.setViewport({ width: 800, height: 800 });
      await page.goto(
        url.resolve(GATSBY_DEVELOP_URL, `overlay/quotes/${quoteId}`),
      );
      await page.screenshot({ path: outputFile });

      // Move browser from busy to free.
      move_map_entry(browserKey, this.busyBrowsers, this.freeBrowsers);
      log(`Finished and moved busy browser ${browserKey} to free browsers.`);
      // callback();

    } catch (err) {
      this.emit('error', err);
    }

    function move_map_entry(key, fromMap, toMap) {
      if (!fromMap.has(key)) {
        throw new Error(`Key ${key} does not exist in map.`);
      }

      toMap.set(key, fromMap.get(key));
      fromMap.delete(key);
    }
  }

  async _final2(callback) {
    await Promise.all([this.freeBrowsers, this.busyBrowsers].map(browsers =>
      Promise.all([...browsers].map(browser => browser.close())),
    ));
    callback();
  }
}