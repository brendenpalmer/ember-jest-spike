const puppeteer = require("puppeteer");
const { setup: setupPuppeteer } = require("jest-environment-puppeteer");

// Connect to the browser created in jest-environment-puppeteer
// so we can perform browser actions once before all tests are run.
module.exports = async function globalSetup() {
  await setupPuppeteer();

  // connect to puppeteer
  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.PUPPETEER_WS_ENDPOINT,
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:4200/tests");
};
