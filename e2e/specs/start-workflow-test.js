import StartPage from "../page/StartPage";
import BalancePage from "../page/BalancePage";
const platform = browser.capabilities.platformName;

describe("general functionality of monefy android app", () => {
  it("should allow user to access some application features before signing up", async () => {
    const page = new StartPage(platform);
    const balance = new BalancePage(platform);

    await page.checkStartWorkflow();
    await page.clickCloseIcon();
    await balance.checkBalancePageLoaded();
  });
});
