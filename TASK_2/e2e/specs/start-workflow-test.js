import StartPage from "../page/StartPage";
import BalancePage from "../page/BalancePage";

describe("general functionality of monefy android app", () => {
  it("should allow user to access some application features before signing up", async () => {
    const page = new StartPage();
    const balance = new BalancePage();

    await page.checkStartWorkflow();
    await page.clickCloseIcon();
    await balance.checkBalancePageLoaded();
  });
});
