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

  async checkBtnText(elementPath, expectedText) {
    await expect($(elementPath)).toHaveText(expectedText);
  }

  async tapBtn(elementPath) {
    await $(elementPath).tap();
  }

  async getElementById(elementId) {
    return await $(`${this.elementIdPath}${elementId}`);
  }

  async getElementByIdAndTap(elementId) {
    await $(`${this.elementIdPath}${elementId}`).tap();
  }

  async getElementByIdWaitTillDisplayed(elementId, timeoutMsg, timeout = 5000) {
    const elem = $(`${this.elementIdPath}${elementId}`);
    await elem.waitForDisplayed({ timeout, timeoutMsg });
  }

  async getElementByIdAndTapGetText(elementId) {
    const elem = $(`${this.elementIdPath}${elementId}`);
    return await elem.getText();
  }

  async getElementByIdAndTapCheckText(elementId, expectedText) {
    const elem = $(`${this.elementIdPath}${elementId}`);
    await expect(elem).toHaveText(expectedText);
  }
}
