import PageUtils from "../common/pageUtils";

export default class StartPage extends PageUtils {
  constructor(platformName) {
    super(platformName);
    this.platformName = platformName;
    const elements = {
      iOS: {
        continueBtn: "~CONTINUE",
        closedBtn: "~closeButton",
        systemAllowBtn: "~Allow",
      },
      Android: {
        continueBtn: ".android.widget.Button",
        closedBtn: "buttonClose",
        systemAllowBtn:
          '//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]',
      },
    };

    this.continueBtn = elements[platformName]?.continueBtn;
    this.closedBtn = elements[platformName]?.closedBtn;
    this.systemAllowBtn = elements[platformName]?.systemAllowBtn;
  }

  async checkStartWorkflow() {
    if (this.platformName === "Android") {
      const steps = [
        "GET STARTED",
        "AMAZING",
        "YES, PLEASE!", // Android specific step for notification permission
        "I’M READY",
        "RESTORE",
      ];

      for (const step of steps) {
        if (step === "YES, PLEASE!") {
          try {
            await this.checkBtnText(this.continueBtn, "YES, PLEASE!");
            await this.clickBtn(this.continueBtn);
            await this.clickBtn(this.systemAllowBtn);
          } catch {
            console.log("Notification permission not requested, skipping...");
          }
        } else {
          await this.checkBtnText(this.continueBtn, step);
          await this.clickBtn(this.continueBtn);
        }
      }
    } else {
      await this.checkBtnText(this.continueBtn, "CONTINUE");
    }
  }

  async clickCloseIcon() {
    await this.getElementByIdAndClick(this.closedBtn);
  }

  async goToBalanceView() {
    await this.checkStartWorkflow();
    await this.clickCloseIcon(this.closedBtn);
  }
}

module.exports = new StartPage(browser.capabilities.platformName);
