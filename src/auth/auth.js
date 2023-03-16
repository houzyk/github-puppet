require('dotenv').config();
const p = require('puppeteer');

const selectors = require("./auth.selectors.json");
const urls = require("./auth.urls.json");

const auth = async () => {
  const browser = await p.launch();
  const page = await browser.newPage();
  await page.goto(urls.login);

  // Fill Details
  const userNameField = await page.$(selectors.userNameField);
  await userNameField.type(process.env.USERNAME);

  const passwordField = await page.$(selectors.passwordField);
  await passwordField.type(process.env.PASSWORD);

  await page.screenshot({path: "assets/pre-auth.png"});

  // Complete Login Action
  const submitButton = await page.$(selectors.submitButton);
  await submitButton.click();

  // Await For Login
  await page.waitForResponse(urls.feed);

  await page.screenshot({path: "assets/post-auth.png"});

  await browser.close();
}

auth();