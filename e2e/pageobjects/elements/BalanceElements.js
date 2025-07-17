export default class BalanceElements {
  constructor() {
    const isIOS = browser.isIOS;

    this.expenseBtn = isIOS ? "~ExpenseButton" : "expense_button";
    this.incomeBtn = isIOS ? "~IncomeButton" : "income_button_title";
    this.piegraph = isIOS ? "~ChartSummaryLabel" : "piegraph";
    this.balanceLabel = isIOS ? "~BalanceValue" : "balance_amount";
    this.bottomMessage = "snackbar_text"; // same for both platforms
  }
}
