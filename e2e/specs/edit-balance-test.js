import StartPage from "../pageobjects/StartPage";
import BalancePage from "../pageobjects/BalancePage";
import EditBalancePage from "../pageobjects/EditBalancePage";

describe("general edit balance functionality", () => {
  it("should calculate balance after income was added", async () => {
    const startPage = new StartPage();
    await startPage.goToBalanceView();
   
    const balancePage = new BalancePage();
    const editPage = new EditBalancePage();
    
    const currentAmount = await balancePage.getCurrentBalanceAmount();
    const addedAmount = await editPage.getRandomValueToModifyBalance();

    await balancePage.clickIncomeBtn();
    await editPage.setAmountOfMoney(addedAmount);
    await editPage.chooseCategory("Salary");

    await balancePage.verifyBalanceAmount(currentAmount, addedAmount);
    await balancePage.waitTillBottomNotificationHidden();
  });

  it.skip("should calculate balance after expense was added", async () => {
    const balancePage = new BalancePage();
    const editPage = new EditBalancePage();

    const currentAmount = await balancePage.getCurrentBalanceAmount();
    const removedAmount = await editPage.getRandomValueToModifyBalance();

    await balancePage.clickExpenseBtn();

    await editPage.setAmountOfMoney(removedAmount);
    await editPage.chooseCategory("House");

    await balancePage.verifyBalanceAmount(currentAmount, removedAmount, false);
    await balancePage.waitTillBottomNotificationHidden();
  });
});
