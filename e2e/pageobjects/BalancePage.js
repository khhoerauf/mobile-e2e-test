import PageUtils from "../common/pageUtils";
import Utils from "../support/utils";
import BalanceElements from "./elements/BalanceElements";

const utils = new Utils();

class BalancePage extends PageUtils {
  constructor(platformName) {
    super(platformName);
    this.platformName = platformName;
    this.elements = new BalanceElements(this.platformName);
  }

  async checkBalancePageLoaded() {
    await this.getElementByIdWaitTillDisplayed(this.elements.piegraph);
  }

  async clickIncomeBtn() {
    console.log("TEST --- TEST");
    await this.checkBalancePageLoaded();
    await this.getElementByIdAndClick(this.elements.incomeBtn);
  }

  async clickExpenseBtn() {
    await this.getElementByIdAndClick(this.elements.expenseBtn);
  }

  async getCurrentBalanceAmount() {
    const balanceText = await this.getElementByIdAndGetText(
      this.elements.balanceLabel
    );
    let balanceInt;

    if (this.platformName === "Android") {
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

    expectedBalanceText = utils
      .formatNumberToEnUsStandard(expectedBalanceInt)
      .toString();

    const balanceName = this.platformName === "Android" ? "Balance " : "";

    // Verify displayed text for negative or positive balance
    if (expectedBalanceInt < 0) {
      expectedBalanceText = `${balanceName}-$${expectedBalanceText.replace("-", "")}`;
    } else {
      expectedBalanceText = `${balanceName}$${expectedBalanceText}`;
    }

    await this.getElementByIdAndCheckText(
      this.elements.balanceLabel,
      expectedBalanceText
    );
  }

  async waitTillBottomNotificationHidden() {
    console.log("#### TEST: this.elementIdPath", this.elementIdPath)
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

module.exports = new BalancePage(browser.capabilities.platformName);
