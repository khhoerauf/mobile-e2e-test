import PageUtils from "../common/pageUtils";

export default class StartPage extends PageUtils {
  async checkStartWorkflow() {
    await this.checkBtnText(this.button, "GET STARTED");
    await this.clickBtn(this.button);
    await this.checkBtnText(this.button, "AMAZING");
    await this.clickBtn(this.button);
    await this.checkBtnText(this.button, "I’M READY");
    await this.clickBtn(this.button);
  }

  async clickCloseIcon() {
    await this.getElementByIdAndClick(this.closeIcon);
  }
}
