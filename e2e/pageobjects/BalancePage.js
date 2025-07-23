import PageUtils from "../common/pageUtils";
import Utils from "../common/utils";
import BalanceElements from "./elements/BalanceElements";

class BalancePage extends PageUtils {
  constructor() {
    super();
    this.utils = new Utils();
    this.elements = new BalanceElements();
  }

  async checkBalancePageLoaded() {
    await this.getElementByIdWaitTillDisplayed(this.elements.piegraph);
  }

  async clickIncomeBtn() {
    await this.checkBalancePageLoaded();
    await this.getElementByIdAndTap(this.elements.incomeBtn);
  }

  async clickExpenseBtn() {
    await this.getElementByIdAndTap(this.elements.expenseBtn);
  }

  async getCurrentBalanceAmount() {
    const balanceText = await this.getElementByIdAndTapGetText(
      this.elements.balanceLabel
    );
    let balanceInt;

    if (browser.isAndroid) {
      balanceInt = Number(
        balanceText.replace("Balance $", "").replace(/,/g, "")
      );
    } else {
      balanceInt = Number(balanceText.replace("$", "").replace(/,/g, ""));
    }
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

    expectedBalanceText = this.utils
      .formatNumberToEnUsStandard(expectedBalanceInt)
      .toString();

    const balanceName = browser.isAndroid ? "Balance " : "";

    // Verify displayed text for negative or positive balance
    if (expectedBalanceInt < 0) {
      expectedBalanceText = `${balanceName}-$${expectedBalanceText.replace("-", "")}`;
    } else {
      expectedBalanceText = `${balanceName}$${expectedBalanceText}`;
    }

    await this.getElementByIdAndTapCheckText(
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
        timeout: 20000,
        timeoutMsg: "expected notification is hidden within 20s",
      }
    );
  }
}

export default BalancePage;