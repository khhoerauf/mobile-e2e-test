import PageUtils from "../common/pageUtils";
import Utils from "../support/utils";

const utils = new Utils();

export default class EditBalancePage extends PageUtils {
  elements = {
    digitButtonKeyboard: "buttonKeyboard", // 0-9
    dotButtonKeyboard: "buttonKeyboardDot",
    categoryKeyboard: "keyboard_action_button",
    categoryView: "relativeLayoutChooseCategoryContainer",
    categoryElement: (categoryName) =>
      `//android.widget.TextView[@resource-id="com.monefy.app.lite:id/textCategoryName" and @text="${categoryName}"]`,
  };

  async clickOnKeyboardValue(keyboardValue) {
    await this.getElementByIdAndClick(
      this.elements.digitButtonKeyboard + keyboardValue
    );
  }

  async setAmountOfMoney(amount) {
    const array = amount.toString().split("");

    for (let i = 0; i < array.length; i++) {
      if (array[i] === ".") {
        await this.getElementByIdAndClick(this.elements.dotButtonKeyboard);
      } else {
        await this.clickOnKeyboardValue(array[i]);
      }
      console.log("Click on keyboard number", array[i]);
    }
  }

  async chooseCategory(categoryName) {
    await this.getElementByIdAndClick(this.elements.categoryKeyboard);
    await this.getElementByIdWaitTillDisplayed(this.elements.categoryView);
    await $(this.elements.categoryElement(categoryName)).click();
  }

  async getRandomValueToModifyBalance() {
    return utils.getRandomNumber();
  }
}
