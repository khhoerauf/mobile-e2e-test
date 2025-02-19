const startPage = require("../pageobjects/StartPage");
const balancePage = require("../pageobjects/BalancePage");
const editPage = require("../pageobjects/EditBalancePage");

before(async () => {
  await startPage.goToBalanceView();
});

describe("general edit balance functionality", () => {
  it("should calculate balance after income was added", async () => {
    const currentAmount = await balancePage.getCurrentBalanceAmount();
    const addedAmount = await editPage.getRandomValueToModifyBalance();

    await balancePage.clickIncomeBtn();
    await editPage.setAmountOfMoney(addedAmount);
    await editPage.chooseCategory("Salary");

    await balancePage.verifyBalanceAmount(currentAmount, addedAmount);
    await balancePage.waitTillBottomNotificationHidden();
  });

  it("should calculate balance after expense was added", async () => {
    const currentAmount = await balancePage.getCurrentBalanceAmount();
    const removedAmount = await editPage.getRandomValueToModifyBalance();

    await balancePage.clickExpenseBtn();

    await editPage.setAmountOfMoney(removedAmount);
    await editPage.chooseCategory("House");

    await balancePage.verifyBalanceAmount(currentAmount, removedAmount, false);
    await balancePage.waitTillBottomNotificationHidden();
  });
});
