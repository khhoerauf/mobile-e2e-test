# Mobile E2E Test Framework

This repository provides an End-to-End testing framework for Monefy mobile application, utilizing [Appium](http://appium.io/docs/en/latest/) and [WebdriverIO](https://webdriver.io) on MacOS. The framework supports automating Android and iOS mobile applications, enabling robust and scalable testing.

# Table of contents

<!--ts-->

- [Folder Structure](#folder-structure)
- [Pre-conditions](#pre-condition)
- [Local Execution](#local-execution)
- [Run Your Tests](#run-your-tests)
- [Example of test execution](#example-of-test-execution)
<!--te-->

# Getting Started

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

## Pre-condition

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

2. Ensure Java JDK is installed and configured:

   - Java Version: java version "23.0.1" 2024-10-15
   - JAVA_HOME Path: /Library/Java/JavaVirtualMachines/jdk-23.jdk/Contents/Home

   Validate your setup:

   ```
   java -version
   echo $JAVA_HOME
   ```

   The $JAVA_HOME environment variable should point to the correct JDK directory.

3. Android Studio and SDK
   Use Android Studio to set up emulators and install the Android SDK:

   Ensure the $ANDROID_HOME environment variable is set to your Android SDK directory.

   ```
   echo $ANDROID_HOME
   ```

   If $ANDROID_HOME is not set, add it to your shell configuration file (e.g., .zshrc):

   ```
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools

   ```

4. Set Up Android Emulator

   - Go to Tools > AVD Manager.
   - Click Create Virtual Device.
   - Select a device and system image (e.g., Pixel 7, API Level 34).

5. (optional) Appium Doctor is a useful tool to verify that all the necessary dependencies for running Appium are installed and properly configured. It helps identify issues in your setup and ensures a smooth Appium experience.
   ```
   npm install -g appium-doctor
   appium-doctor --android
   ```

# Local Execution

1. Install Dependencies
   Run the following command to install all required packages:

   ```
   npm install
   ```

2. Configure Desired Capabilities
   The framework uses the `wdio.conf.js` configuration file. To simplify modifications, the device name and application package name are sourced from the `.env` file. This approach helps manage environment-specific configurations efficiently.

   You can refer to an example `.env` configuration in the `env` file.

   ```
   DEVICE_NAME="PIXEL_7"
   APP_PACKAGE= "com.monefy.app.lite"
   APP_ACTIVITY="com.monefy.activities.main.MainActivity_"
   ```

3. Manage Emulators
   Use the provided scripts to list, start, or shut down Android emulators.

   List Available Emulators
   Run the following command to see a list of available Android emulators:

   ```
   npm run list-emulators
   ```

   Start an Emulator

   Start the emulator specified in the .env file by running:

   ```
   npm run start-emulator
   ```

   Shut Down All Emulators
   To close all running Android emulators, execute:

   ```
   npm run end-emulators
   ```

4. Install Monefy app on your emulator.

# Run Your Tests

"!!! IMPORTANT: Make sure that the Monefy app is installed on your desired emulator before executing the tests."

1. Once the emulator is running and the test application is installed, you can execute your test suite with the following commands:

   ```
   npm run e2e-local
   ```

   This will trigger WebdriverIO to connect to the emulator, open the Monefy app, and execute the specified test scenarios.

   You can use the following script to run the emulator (application needs to be installed), execute the tests, and close the emulator:

   ```
   npm run e2e-ci
   ```

2. Generate and View Test Reports

   After running your tests, test logs are generated and stored in the /allure-results folder. You can view a detailed test report by using the following command:

   ```
   npm run open-reporter
   ```

   This command will generate the [Allure](https://allurereport.org) report and open it in your default browser, providing a comprehensive view of:

   - Passed, failed, and skipped tests.
   - Logs for debugging.

# Example of test execution
