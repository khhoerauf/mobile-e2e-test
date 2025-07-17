export default class EditBalanceElements {
  constructor() {
    const isIOS = browser.isIOS;

    this.digitButtonKeyboard = isIOS ? "~Digit" : "buttonKeyboard"; // 0–9
    this.dotButtonKeyboard = isIOS ? "~Dot" : "buttonKeyboardDot";
    this.categoryKeyboard = isIOS
      ? "~ChooseCategory"
      : "keyboard_action_button";
    this.categoryView = isIOS
      ? "XCUIElementTypeCollectionView"
      : "relativeLayoutChooseCategoryContainer";
    this.categoryElement = isIOS
      ? (categoryName) => `~${categoryName}`
      : (categoryName) =>
          `//android.widget.TextView[@resource-id="com.monefy.app.lite:id/textCategoryName" and @text="${categoryName}"]`;
  }
}