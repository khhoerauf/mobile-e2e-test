
import StartPage from "../page/StartPage";
import BalancePage from "../page/BalancePage";
import EditBalancePage from "../page/EditBalancePage";

before(() => {
  const page = new StartPage("iOS");
  page.goToBalanceView();
});

describe("edit balance functionality of monefy android app | Salary", () => {
  it("should allow user to add income then calculate dollars balance correctly", async () => {
    const balance = new BalancePage("iOS");
    const edit = new EditBalancePage("iOS");
    const currentAmount = await balance.getCurrentBalanceAmount();
    const addedAmount = await edit.getRandomValueToModifyBalance();

    await balance.clickIncomeBtn();
    await edit.setAmountOfMoney(addedAmount);
    await edit.chooseCategory("Salary");

    await balance.verifyBalanceAmount(currentAmount, addedAmount);
    await balance.waitTillBottomNotificationHidden();
  });

  it("should allow user to add expense then calculate dollars balance correctly", async () => {
    const balance = new BalancePage("iOS");
    const edit = new EditBalancePage("iOS");
    const currentAmount = await balance.getCurrentBalanceAmount();
    const removedAmount = await edit.getRandomValueToModifyBalance();

    await balance.clickExpenseBtn();
    await edit.setAmountOfMoney(removedAmount);
    await edit.chooseCategory("House");

    await balance.verifyBalanceAmount(currentAmount, removedAmount, false);
    await balance.waitTillBottomNotificationHidden();
  });
});
