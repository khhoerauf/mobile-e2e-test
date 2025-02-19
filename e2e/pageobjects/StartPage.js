import PageUtils from "../common/pageUtils";

export default class StartPage extends PageUtils {
  constructor(platformName) {
    super(platformName);
    this.platformName = platformName;
    const elements = {
      iOS: {
        continueBtn: '~CONTINUE',
        closedBtn: '~closeButton',
      },
      Android: {
        continueBtn: '.android.widget.Button',
        closedBtn: 'buttonClose',
      }
    };

    this.continueBtn = elements[platformName]?.continueBtn;
    this.closedBtn = elements[platformName]?.closedBtn;
  }

  async checkStartWorkflow() {
    if(this.platformName === 'Android') {
      await this.checkBtnText(this.continueBtn, "GET STARTED");
      await this.clickBtn(this.continueBtn);
      await this.checkBtnText(this.continueBtn, "AMAZING");
      await this.clickBtn(this.continueBtn);
      await this.checkBtnText(this.continueBtn, "I’M READY");
      await this.clickBtn(this.continueBtn);
      await this.checkBtnText(this.continueBtn, "RESTORE");
    } else {
      await this.checkBtnText(this.continueBtn, "CONTINUE")
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
