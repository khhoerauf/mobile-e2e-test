export default class PageUtils {
  constructor() {
    let id = "";
    if (browser.isAndroid) {
      id = `id=${process.env.ANDROID_APP_PACKAGE}:id/`;
    } else {
      id = "";
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
    try {
      await $(`${this.elementIdPath}${elementId}`).click();
    } catch (error) {
      console.error(`Element with ID ${elementId} not found:`);
    }
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
