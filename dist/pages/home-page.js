"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePage = void 0;

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async login() {
    await this.page.goto('http://localhost:4200/login', {
      waitUntil: 'domcontentloaded'
    });
    const usernameInput = await this.page.$('#email-input');
    usernameInput.type('porfirio.matias@outlook.com');
    await this.page.waitFor(2000);
    const passwordInput = await this.page.$('#password-input');
    passwordInput.type('Dominica1');
    await this.page.waitFor(2000);
    const loginButton = await this.page.$('#login-button');
    await loginButton.click();
    await this.page.waitForNavigation();
  }

  async getLogOutButton() {
    const logOutButton = await this.page.$('body > app-root > app-navigation-bar > nav > button');
    return await this.page.evaluate(logOutButton => logOutButton.textContent, logOutButton);
  }

  async getSelectAVideoButton() {
    const selectVideoButton = await this.page.$('#select-video-button');
    return await this.page.evaluate(selectVideoButton => selectVideoButton.textContent, selectVideoButton);
  }

  async isGetSelectVideoButtonDisabled() {
    const isDisabled = await this.page.evaluate('document.querySelector("#select-video-button").getAttribute("disabled")');
    return isDisabled === 'disabled';
  }

  async getSaveVideoButton() {
    const saveVideoButton = await this.page.$('#save-button');
    return await this.page.evaluate(saveVideoButton => saveVideoButton.textContent, saveVideoButton);
  }

  async clickSaveVideoButton() {
    const saveVideoButton = await this.page.$('#save-button');
    await saveVideoButton.click();
  }

  async clickSelectAVideoButton() {
    const selectAVideoButton = await this.page.$('#select-video-button');
    await selectAVideoButton.click();
  }

  async isSaveButtonDisabled() {
    const isDisabled = await this.page.evaluate('document.querySelector("#save-button").getAttribute("disabled")');
    return isDisabled === true;
  }

  async selectASponsorship(sponsorshipName) {
    const select = await this.page.$('#sponsorship-select');
    await select.click();
    const option = await this.page.$('#mat-option-1 > span');
    await option.click();
    return await this.page.evaluate(option => option.textContent, option);
  }

  async uploadAVideo() {
    const inputUploadHandle = await this.page.$('#file');
    let fileToUpload = './src/media/sample-video.mp4'; // Sets the value of the file input to fileToUpload

    await inputUploadHandle.uploadFile(fileToUpload);
  }

  async getSuccessfulUploadText() {
    const successfulUpload = await this.page.$('body > app-root > div > app-upload-view > div > div');
    return await this.page.evaluate(successfulUpload => successfulUpload.textContent, successfulUpload);
  }

}

exports.HomePage = HomePage;
;