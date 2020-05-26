"use strict";

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _homePage = require("../pages/home-page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
describe('Home Page E2E Tests', () => {
  it('should exist', () => {
    expect(() => new _homePage.HomePage({})).toEqual(jasmine.any(Function));
  });
  let browser;
  let page;
  beforeEach(async () => {
    browser = await _puppeteer.default.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
  });
  it('should have a Login Page with a Login Button', async () => {
    await page.goto('https://d1s3z7p9p47ieq.cloudfront.net/', {
      waitUntil: 'domcontentloaded'
    });
    const navButton = await page.$("#login-button");
    const text = await page.evaluate(navButton => navButton.textContent, navButton);
    const formTitle = await page.$("body > app-root > div > app-auth-view > div > app-login-form > div > mat-card > mat-card-title");
    const formTitleText = await page.evaluate(formTitle => formTitle.textContent, formTitle);
    expect(text).toEqual('Login');
    expect(formTitleText).toEqual('Login');
  });
  describe('after logging in', () => {
    let homePage;
    beforeEach(async () => {
      homePage = new _homePage.HomePage(page);
      await homePage.login();
      await homePage.page.waitFor(2000);
    });
    it('should Log Out Button after successful login', async () => {
      const logOutButtonText = await homePage.getLogOutButton();
      expect(logOutButtonText).toEqual('Log Out');
    });
    it('should have select video button and should be disabled', async () => {
      const selectVideoButtonText = await homePage.getSelectAVideoButton();
      const isDisabled = await homePage.isGetSelectVideoButtonDisabled();
      expect(selectVideoButtonText).toEqual(' Select a video ');
      expect(isDisabled).toEqual(true);
    });
    it('should have a save video button', async () => {
      const saveVideoButtonText = await homePage.getSaveVideoButton();
      expect(saveVideoButtonText).toEqual('Save');
    });
  });
  describe('uploading', () => {
    let homePage;
    beforeEach(async () => {
      homePage = new _homePage.HomePage(page);
      await homePage.login();
      await homePage.page.waitFor(2000);
    });
    it('should enable Select Video Button after Selecting Sponsorship', async () => {
      const sponsorshipName = 'Juan Felipe Isaza Galviz';
      const selectedSponsorship = await homePage.selectASponsorship(sponsorshipName);
      const isDisabled = await homePage.isGetSelectVideoButtonDisabled();
      expect(isDisabled).toEqual(false);
      expect(selectedSponsorship).toEqual(sponsorshipName);
    });
    it('should enable Save Button after Selecting File', async () => {
      const sponsorshipName = 'Juan Felipe Isaza Galviz';
      const selectedSponsorship = await homePage.selectASponsorship(sponsorshipName);
      homePage.uploadAVideo();
      await homePage.page.waitFor(1000);
      const isDisabled = await homePage.isSaveButtonDisabled();
      expect(isDisabled).toEqual(false);
      expect(selectedSponsorship).toEqual(sponsorshipName);
    });
    fit('should Save Video', async () => {
      const sponsorshipName = 'Juan Felipe Isaza Galviz';
      const selectedSponsorship = await homePage.selectASponsorship(sponsorshipName);
      await homePage.uploadAVideo();
      await homePage.page.waitFor(3000);
      const isDisabled = await homePage.isSaveButtonDisabled();
      expect(isDisabled).toEqual(false);
      await homePage.clickSaveVideoButton();
      await homePage.page.waitFor(10000);
      const message = await homePage.getSuccessfulUploadText();
      expect(message).toEqual('Thank you for your video! We are now translating and close captioning your video before sending it on to your sponsorship.');
    });
  });
});