exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: "hub.browserstack.com",
  services: [
    [
      "browserstack",
      {
        app: `bs://${process.env.BROWSERSTACK_APP_ID}`,
        buildIdentifier: "${BUILD_NUMBER}",
        browserstackLocal: true,
      },
    ],
  ],
  capabilities: [
    {
      "bstack:options": {
        deviceName: "Google Pixel 9",
        platformVersion: "15.0",
        platformName: "Android",
      },
    },
  ],
  commonCapabilities: {
    "bstack:options": {
      projectName: "BrowserStack Samples",
      buildName: "browserstack build",
      sessionName: "BStack parallel webdriverio-appium",
      debug: true,
      networkLogs: true,
    },
  },
  specs: ["./e2e/specs/**-test.js"],
  exclude: [],
  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 20000,
  }
};
