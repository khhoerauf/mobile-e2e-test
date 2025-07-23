import PageUtils from "../common/pageUtils";
import StartElements from "./elements/StartElements";

class StartPage extends PageUtils {
  constructor() {
    super();
    this.elements = new StartElements();
  }

  async checkStartWorkflow() {
    if (browser.isAndroid) {
      const steps = [
        "GET STARTED",
        "AMAZING",
        "YES, PLEASE!", // Android specific step for notification permission
        "I’M READY"
      ];

      for (const step of steps) {
        if (step === "YES, PLEASE!") {
          try {
            await this.checkBtnText(this.elements.continueBtn, "YES, PLEASE!");
            await this.tapBtn(this.elements.continueBtn);
            await this.tapBtn(this.elements.systemAllowBtn);
          } catch {
            console.log("Notification permission not requested, skipping...");
          }
        } else {
          await this.checkBtnText(this.elements.continueBtn, step);
          await this.tapBtn(this.elements.continueBtn);
        }
      }
    } else {
      await this.checkBtnText(this.elements.continueBtn, "CONTINUE");
    }
  }

  async clickCloseIcon() {
    await this.getElementByIdAndTap(this.elements.closedBtn);
  }

  async goToBalanceView() {
    await this.checkStartWorkflow();
    await this.clickCloseIcon(this.elements.closedBtn);
  }
}

export default StartPage;
