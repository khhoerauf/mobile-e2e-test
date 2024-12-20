import PageUtils from "../common/pageUtils";
import Utils from "../support/utils";

const utils = new Utils();

export default class EditBalancePage extends PageUtils {
  constructor(platformName) {
    super(platformName);
    this.platformName = platformName;

    const elements = {
      iOS: {
        digitButtonKeyboard: '~Digit', // 0-9
        dotButtonKeyboard: '~Dot',
        categoryKeyboard: '~ChooseCategory',
        categoryView: 'XCUIElementTypeCollectionView',
        categoryElement: (categoryName) => `~${categoryName}`

      },
      Android: {
        digitButtonKeyboard: "buttonKeyboard", // 0-9
        dotButtonKeyboard: "buttonKeyboardDot",
        categoryKeyboard: "keyboard_action_button",
        categoryView: "relativeLayoutChooseCategoryContainer",
        categoryElement: (categoryName) =>
          `//android.widget.TextView[@resource-id="com.monefy.app.lite:id/textCategoryName" and @text="${categoryName}"]`,
      }
    };
  
    this.digitButtonKeyboard = elements[platformName]?.digitButtonKeyboard;
    this.dotButtonKeyboard = elements[platformName]?.dotButtonKeyboard;
    this.categoryKeyboard = elements[platformName]?.categoryKeyboard;
    this.categoryView = elements[platformName]?.categoryView;
    this.categoryElement = elements[platformName]?.categoryElement;
  }

  async clickOnKeyboardValue(keyboardValue) {
    await this.getElementByIdAndClick(
      this.digitButtonKeyboard + keyboardValue
    );
  }

  async setAmountOfMoney(amount) {
    const array = amount.toString().split("");

    for (let i = 0; i < array.length; i++) {
      if (array[i] === ".") {
        await this.getElementByIdAndClick(this.dotButtonKeyboard);
      } else {
        await this.clickOnKeyboardValue(array[i]);
      }
      console.log("Click on keyboard number", array[i]);
    }
  }

  async chooseCategory(categoryName) {
    console.log("Click on category: ", categoryName);

    await this.getElementByIdAndClick(this.categoryKeyboard);
    await this.getElementByIdWaitTillDisplayed(this.categoryView);
    await $(this.categoryElement(categoryName)).click();
  }

  async getRandomValueToModifyBalance() {
    return utils.getRandomNumber();
  }
}
