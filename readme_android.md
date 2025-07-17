## Pre-condition

1. Ensure Java JDK is installed and configured:

   - Java Version: java version "23.0.1" 2024-10-15
   - JAVA_HOME Path: /Library/Java/JavaVirtualMachines/jdk-23.jdk/Contents/Home

   Validate your setup:

   ```
   java -version
   echo $JAVA_HOME
   ```

   The `$JAVA_HOME` environment variable should point to the correct JDK directory.

2. Android Studio and SDK
   Use Android Studio to set up emulators and install the Android SDK:

   Ensure the `$ANDROID_HOME` environment variable is set to your Android SDK directory.

   ```
   echo $ANDROID_HOME
   ```

   If `$ANDROID_HOME` is not set, add it to your shell configuration file (e.g., .zshrc):

   ```
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools

   ```

3. Set Up Android Emulator

   - Go to Tools > AVD Manager.
   - Click Create Virtual Device.
   - Select a device and system image (e.g., Pixel 7, API Level 34).

# Local Execution

1. Install Dependencies
   Run the following command to install all required packages:

   ```
   npm install
   ```

2. Configure Desired Capabilities
   The framework uses the `wdio.conf.js` configuration file. To simplify modifications, the device name and application package name are sourced from the `.env` file. This approach helps manage environment-specific configurations efficiently. This approach helps manage environment-specific configurations efficiently. The framework allows tests to be executed on multiple devices in parallel, for instance:

   For one Android device:

   ```
   MAX_INSTANCES=1
   ANDROID_DEVICE_NAMES="Pixel7"
   ```

   For two Android devices:
   ```
   MAX_INSTANCES=2
   ANDROID_DEVICE_NAMES="Pixel7,Pixel9"
   ```

   If you do not want to execute tests on multiple devices in parallel, simply set MAX_INSTANCES to 1.
   
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

# Run Your Tests Locally

`IMPORTANT: Make sure that the Monefy app is installed on your desired emulator before executing the tests.`

1. Once the emulator is running and the test application is installed, you can execute your test suite with the following commands:

   ```
   npm run e2e-local
   ```

   This will trigger WebdriverIO to connect to the emulator, open the Monefy app, and execute the specified test scenarios.

   You can use the following script to run the emulator, execute the tests, and close the emulator:

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

# Run Your Tests on Browserstack

1. Set up environment variables: 
To authenticate with BrowserStack, you’ll need two credentials:
 - `BROWSERSTACK_USERNAME`
 - `BROWSERSTACK_ACCESS_KEY`
 - `BROWSERSTACK_APP_ID` 
You can find these in your [BrowserStack account settings](https://www.browserstack.com/accounts/settings).

2. Define devices in the config file
Device capabilities are defined in a special WebdriverIO configuration file, typically named: `wdio.conf.browserstack.js`

3. Once everything is set up, you can execute your tests on BrowserStack by running:

   ```
   npm run e2e-browserstack
   ```
