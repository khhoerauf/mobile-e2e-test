import PageUtils from "../common/pageUtils";
import Utils from "../support/utils";

const utils = new Utils();

export default class BalancePage extends PageUtils {
  elements = {
    getNavigationBtn: (navigationType) => `~${navigationType} navigation`, // Open or Close
    filterModal: "androidx.drawerlayout.widget.DrawerLayout",
    piegraph: "piegraph",
    balanceLabel: "balance_amount",
    expenseBtn: "expense_button",
    incomeBtn: "income_button_title",
    bottomMessage: "snackbar_text",
  };

  async checkBalancePageLoaded() {
    await this.getElementByIdWaitTillDisplayed(this.elements.piegraph);
  }

  async clickIncomeBtn() {
    await this.checkBalancePageLoaded();
    await this.getElementByIdAndClick(this.elements.incomeBtn);
  }

  async clickExpenseBtn() {
    await this.checkBalancePageLoaded();
    await this.getElementByIdAndClick(this.elements.expenseBtn);
  }

  async getCurrentBalanceAmount() {
    const balanceText = await this.getElementByIdAndGetText(
      this.elements.balanceLabel
    );
    const balanceInt = Number(
      balanceText.replace("Balance $", "").replace(/,/g, "")
    );
    return balanceInt;
  }

  async verifyBalanceAmount(currentAmount, modifiedAmount, isIncome = true) {
    const intModifiedAmount = Number(modifiedAmount);

    let expectedBalanceInt;
    let expectedBalanceText;

    // Calculate expected new balance based on balance before modification
    if (isIncome) {
      expectedBalanceInt = currentAmount + intModifiedAmount;
    } else {
      expectedBalanceInt = currentAmount - intModifiedAmount;
    }

    expectedBalanceText = utils
      .formatNumberToEnUsStandard(expectedBalanceInt)
      .toString();

    // Verify displayed text for negative or positive balance
    if (expectedBalanceInt < 0) {
      expectedBalanceText = `Balance -$${expectedBalanceText.replace("-", "")}`;
    } else {
      expectedBalanceText = `Balance $${expectedBalanceText}`;
    }

    await this.getElementByIdAndCheckText(
      this.elements.balanceLabel,
      expectedBalanceText
    );
  }

  async waitTillBottomNotificationHidden() {
    const elem = await $(`${this.elementIdPath}${this.elements.bottomMessage}`);
    await elem.waitUntil(
      async function () {
        return (await elem.isDisplayed()) === false;
      },
      {
        timeout: 30000, // to avoid flaky test set up 30s
        timeoutMsg: "expected notification is hidden within 20s",
      }
    );
  }
}
