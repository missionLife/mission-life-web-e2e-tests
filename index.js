const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false, args:['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://d1s3z7p9p47ieq.cloudfront.net/login')

  const usernameInput = await page.$('#email-input');
  usernameInput.type('porfirio.matias@outlook.com');

  await page.waitFor(2000);

  const passwordInput = await page.$('#password-input');
  passwordInput.type('Dominica1');

  await page.waitFor(2000);

  const loginButton = await page.$('#login-button');
  await loginButton.click();

  await page.waitFor(5000);

  await browser.close();
})();

