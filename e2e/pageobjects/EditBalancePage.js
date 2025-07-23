import PageUtils from "../common/pageUtils";
import Utils from "../common/utils";
import EditBalanceElements from "./elements/EditBalanceElements";

class EditBalancePage extends PageUtils {
  constructor() {
      super();
      this.utils = new Utils();
      this.elements = new EditBalanceElements();
    }

  async clickOnKeyboardValue(keyboardValue) {
    await this.getElementByIdAndTap(this.elements.digitButtonKeyboard + keyboardValue);
  }

  async setAmountOfMoney(amount) {
    const array = amount.toString().split("");

    for (let i = 0; i < array.length; i++) {
      if (array[i] === ".") {
        await this.getElementByIdAndTap(this.elements.dotButtonKeyboard);
      } else {
        await this.clickOnKeyboardValue(array[i]);
      }
    }
  }

  async chooseCategory(categoryName) {
    await this.getElementByIdAndTap(this.elements.categoryKeyboard);
    await this.getElementByIdWaitTillDisplayed(this.elements.categoryView);
    await $(this.elements.categoryElement(categoryName)).click();
  }

  async getRandomValueToModifyBalance() {
    return this.utils.getRandomNumber();
  }
}

export default EditBalancePage;
