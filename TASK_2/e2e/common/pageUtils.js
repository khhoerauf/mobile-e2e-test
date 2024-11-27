import SharedElements from "./sharedElements";

export default class PageUtils extends SharedElements {
  elementIdPath = `id=${process.env.APP_PACKAGE}:id/`;

  async checkElementDisplayed(elementPath, timeout = 5000) {
    const elem = await $(elementPath);
    await expect(elem).toBeDisplayed({ timeout });
  }

  async checkBtnText(elementPath, expectedText) {
    const actualText = await $(elementPath).getText();
    await expect(actualText).toBe(expectedText);
  }

  async clickBtn(elementPath) {
    await $(elementPath).click();
  }

  async waitTillElementVisible(elementPath, timeout) {
    const elem = await $(elementPath);
    await elem.waitForDisplayed({ timeout });
  }

  async getElementById(elementId) {
    return await $(`${this.elementIdPath}${elementId}`);
  }

  async getElementByIdAndClick(elementId) {
    await $(`${this.elementIdPath}${elementId}`).click();
  }

  async getElementByIdWaitTillDisplayed(elementId, timeout = 5000) {
    await $(`${this.elementIdPath}${elementId}`).waitForDisplayed({
      timeout,
    });
  }

  async getElementByIdAndGetText(elementId) {
    return await $(`${this.elementIdPath}${elementId}`).getText();
  }

  async getElementByIdAndCheckText(elementId, expectedText) {
    const actualText = await $(`${this.elementIdPath}${elementId}`).getText();
    await expect(actualText).toBe(expectedText);
  }
}
