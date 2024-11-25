import StartPage from "../page/StartPage";
import BalancePage from "../page/BalancePage";
import EditBalancePage from "../page/EditBalancePage";

describe("general functionality of monefy android app", () => {
  it("should allow user to access some application features before signing up", async () => {
    const page = new StartPage();
    const balance = new BalancePage();

    await page.checkStartWorkflow();
    await page.clickCloseIcon();
    await balance.checkBalancePageLoaded();
  });

  it("should allow user to add income then calculate $ balance correctly", async () => {
    const balance = new BalancePage();
    const edit = new EditBalancePage();
    const currentAmount = await balance.getCurrentBalanceAmount();
    const addedAmount = edit.getRandomNumber();

    await balance.clickIncomeBtn();
    await edit.setAmountOfMoney(addedAmount);
    await edit.chooseCategory("Salary");

    await balance.verifyBalanceAmount(currentAmount, addedAmount);
    await balance.waitTillBottomNotificationHidden();
  });

  it("should allow user to add expense then calculate $ balance correctly", async () => {
    const balance = new BalancePage();
    const edit = new EditBalancePage();
    const currentAmount = await balance.getCurrentBalanceAmount();
    const addedAmount = edit.getRandomNumber();

    await balance.clickExpenseBtn();
    await edit.setAmountOfMoney(addedAmount);
    await edit.chooseCategory("House");
    await balance.verifyBalanceAmount(currentAmount, addedAmount, false);
    await balance.waitTillBottomNotificationHidden();
  });
});
