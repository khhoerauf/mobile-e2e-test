# Mobile E2E Test Framework

This repository provides an End-to-End testing framework for Monefy mobile application, utilizing [Appium](http://appium.io/docs/en/latest/) and [WebdriverIO](https://webdriver.io) on MacOS. The framework supports automating Android and iOS mobile applications, enabling robust and scalable testing.

This project does not include integration with any CI pipeline. To execute tests, the application must be installed directly from the Google Play Store or Apple App Store. For iOS, test execution can only be performed on a real device, as simulators do not support app installations from the App Store.

## Application under test

You can download the apps here:
- [iOS](https://itunes.apple.com/us/app/monefy-money-manager/id1212024409?)
- [Android](https://play.google.com/store/apps/details?id=com.monefy.app.lite)

## Folder Structure

```
mobile-e2e-test/
├── app/               # Here should be placed working application apk
├── e2e/
│   ├── common/        # WebdriverIO shared page actions and elements
│   ├── page/          # Page Object Model (POM) files
│   ├── specs/         # Test specifications
│   └── support/       # Utilities and helpers
├── wdio.conf.js       # WebdriverIO configuration
└── package.json       # Node.js dependencies and scripts
```

## Pre-condition && Local Execution 

Before running the Mobile E2E Test Framework, ensure the following tools are installed and properly configured:

1. Verify that Node.js and npm are installed and meet the required versions:

   - Node.js: v20.10.0
   - npm: 10.2.3

   Check versions using:

   ```
   node -v | v20.10.0
   npm -v | 10.2.3
   ```

Ensure these versions are up-to-date for compatibility with WebdriverIO and Appium.

2. (recommended) Appium Doctor is a useful tool to verify that all the necessary dependencies for running Appium are installed and properly configured. It helps identify issues in your setup and ensures a smooth Appium experience.
   ```
   npm install -g appium-doctor
   appium-doctor --android
   appium-doctor --ios
   ```

3. For platform-specific documentation, refer to the following files:
- readme_android.md — Instructions for Android
- readme_ios.md — Instructions for iOS



