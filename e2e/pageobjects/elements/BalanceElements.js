export default class BalanceElements {
  constructor(platformName) {
    const elements = {
      iOS: {
        expenseBtn: "~ExpenseButton",
        incomeBtn: "~IncomeButton",
        piegraph: "~ChartSummaryLabel",
        balanceLabel: "~BalanceValue",
        bottomMessage: "snackbar_text",
      },
      Android: {
        expenseBtn: "expense_button",
        incomeBtn: "income_button_title",
        piegraph: "piegraph",
        balanceLabel: "balance_amount",
        bottomMessage: "snackbar_text",
      },
    };

    this.expenseBtn = elements[platformName]?.expenseBtn;
    this.incomeBtn = elements[platformName]?.incomeBtn;
    this.filterModal = elements[platformName]?.filterModal;
    this.piegraph = elements[platformName]?.piegraph;
    this.balanceLabel = elements[platformName]?.balanceLabel;
    this.bottomMessage = elements[platformName]?.bottomMessage;
  }
}