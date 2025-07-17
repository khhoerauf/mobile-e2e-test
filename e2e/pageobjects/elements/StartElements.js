export default class StartElements {
  constructor() {
    const isIOS = browser.isIOS;

    this.continueBtn = isIOS ? "~CONTINUE" : ".android.widget.Button";
    this.closedBtn = isIOS ? "~closeButton" : "buttonClose";
    this.systemAllowBtn = isIOS
      ? "~Allow"
      : '//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]';
  }
}
