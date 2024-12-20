import PageUtils from '../common/pageUtils';
import Utils from '../support/utils';

const utils = new Utils();

export default class BalancePage extends PageUtils {
  constructor(platformName) {
    super(platformName);
    this.platformName = platformName;

    const elements = {
      iOS: {
        expenseBtn: '~ExpenseButton',
        incomeBtn: '~IncomeButton',
        piegraph: '~ChartSummaryLabel',
        balanceLabel: '~BalanceValue',
        bottomMessage: 'snackbar_text'
      },
      Android: {
        expenseBtn: 'expense_button',
        incomeBtn: 'income_button_title',
        piegraph: 'piegraph',
        balanceLabel: 'balance_amount',
        bottomMessage: 'snackbar_text',
      }
    }

    this.expenseBtn = elements[platformName]?.expenseBtn;
    this.incomeBtn = elements[platformName]?.incomeBtn;
    this.filterModal = elements[platformName]?.filterModal;
    this.piegraph = elements[platformName]?.piegraph;
    this.balanceLabel = elements[platformName]?.balanceLabel;
    this.bottomMessage = elements[platformName]?.bottomMessage;
  }

  async checkBalancePageLoaded() {
    await this.getElementByIdWaitTillDisplayed(this.piegraph);
  }

  async clickIncomeBtn() {
    await this.checkBalancePageLoaded();
    await this.getElementByIdAndClick(this.incomeBtn);
  }

  async clickExpenseBtn() {
    await this.checkBalancePageLoaded();
    await this.getElementByIdAndClick(this.expenseBtn);
  }

  async getCurrentBalanceAmount() {
    const balanceText = await this.getElementByIdAndGetText(
      this.balanceLabel
    );
    let balanceInt;

    if (this.platformName === 'Android') {
      balanceInt = Number(balanceText.replace('Balance $', '').replace(/,/g, ''));
    } else {
      balanceInt = Number(balanceText.replace('$', '').replace(/,/g, ''));
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
    
    const balanceName = (this.platformName === 'Android' ? 'Balance ' : '');

    // Verify displayed text for negative or positive balance
    if (expectedBalanceInt < 0) {
      expectedBalanceText = `${balanceName}-$${expectedBalanceText.replace('-', '')}`;
    } else {
      expectedBalanceText = `${balanceName}$${expectedBalanceText}`;
    }

    await this.getElementByIdAndCheckText(
      this.balanceLabel,
      expectedBalanceText
    );
  }

  async waitTillBottomNotificationHidden() {
    const elem = await $(`${this.elementIdPath}${this.bottomMessage}`);
    await elem.waitUntil(
      async function () {
        return (await elem.isDisplayed()) === false;
      },
      {
        timeout: 20000,
        timeoutMsg: 'expected notification is hidden within 20s',
      }
    );
  }
}
