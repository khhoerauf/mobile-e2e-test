import PageUtils from "../common/pageUtils";

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
    await this.getElementByIdAndClick(this.elements.incomeBtn);
  }

  async clickExpenseBtn() {
    await this.getElementByIdAndClick(this.elements.expenseBtn);
  }

  async getCurrentBalanceAmount() {
    return await this.getElementByIdAndGetText(this.elements.balanceLabel);
  }

  async verifyBalanceAmount(currentAmount, modifiedAmount, isIncome = true) {
    const balanceBefore = Number(
      currentAmount.replace("Balance $", "").replace(/,/g, "")
    );
    const intModifiedAmount = Number(modifiedAmount);

    let expectedAmount;

    // Calculate expected amount based on balance before modification
    if (isIncome) {
      expectedAmount = balanceBefore + intModifiedAmount;
    } else {
      expectedAmount = balanceBefore - intModifiedAmount;
    }

    const formatter = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Verify displayed text for negative and positive balance
    if (expectedAmount < 0) {
      await this.getElementByIdAndCheckText(
        this.elements.balanceLabel,
        `Balance -$${formatter
          .format(expectedAmount)
          .toString()
          .replace("-", "")}`
      );
    } else {
      await this.getElementByIdAndCheckText(
        this.elements.balanceLabel,
        `Balance $${formatter.format(expectedAmount).toString()}`
      );
    }
  }

  async waitTillBottomNotificationHidden() {
    const elem = await $(`${this.elementIdPath}${this.elements.bottomMessage}`);
    await elem.waitUntil(
      async function () {
        return (await elem.isDisplayed()) === false;
      },
      {
        timeout: 30000,
        timeoutMsg: "expected notification is hidden within 30s",
      }
    );
  }
}
