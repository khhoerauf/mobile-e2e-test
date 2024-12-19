import PageUtils from "../common/pageUtils";

export default class StartPage extends PageUtils {
  constructor(platformName) {
    super();
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
    } else {
      await this.checkBtnText(this.continueBtn, "CONTINUE");
      await this.clickBtn(this.continueBtn);
    }
  }

  async clickCloseIcon() {
    if(this.platformName === 'Android') {
      await this.getElementByIdAndClick(this.closedBtn);
    } else {
      await this.clickBtn(this.closedBtn);
    }
  }

  async goToBalanceView() {
    this.checkStartWorkflow();
    await this.getElementByIdAndClick(this.closedBtn);
  }
}
