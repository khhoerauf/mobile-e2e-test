import SharedElements from "./sharedElements";

export default class PageUtils extends SharedElements {
  constructor(platformName) {
    super();
    this.platformName = platformName;
    
    let id;
    if (platformName === 'Android') {
      id = `id=${process.env.APP_PACKAGE}:id/`;
    } else {
      id = ''
    }
    
    this.elementIdPath = id;
  }
  
  async checkElementDisplayed(elementPath, timeout = 5000) {
    const elem = await $(elementPath);
    await expect(elem).toBeDisplayed({ timeout });
  }

  async checkBtnText(elementPath, expectedText) {
    await expect($(elementPath)).toHaveText(expectedText);
  }

  async clickBtn(elementPath) {
    await $(elementPath).click();
  }

  async getElementById(elementId) {
    return await $(`${this.elementIdPath}${elementId}`);
  }

  async getElementByIdAndClick(elementId) {
    await $(`${this.elementIdPath}${elementId}`).click();
  }

  async getElementByIdWaitTillDisplayed(elementId, timeoutMsg, timeout = 5000) {
    const elem = await $(`${this.elementIdPath}${elementId}`);
    await elem.waitForDisplayed({ timeout, timeoutMsg });
  }

  async getElementByIdAndGetText(elementId) {
    return await $(`${this.elementIdPath}${elementId}`).getText();
  }

  async getElementByIdAndCheckText(elementId, expectedText) {
    const elem = await $(`${this.elementIdPath}${elementId}`);
    await expect(elem).toHaveText(expectedText);
  }
}
