## Pre-condition

1. Install `XCode`
2. Install `Xcode Command Line Tools`
3. Make sure `WebDriverAgent` is installed.
    ```
    find . -name "appium-webdriveragent"
    ```
    In case It could not found any path, install it with following command:
    ```
    npm i appium-webdriveragent
    ```
    When installation is found, rerunning the first command should provide found path. Then, you should try open project in `XCode`. Follow those steps:
    
    ```
    open ./node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent
    ```
    *change path after open, to the path where your `webdriveragent` was installed

    Then open project by clicking on `WebDriverAgent.xcodeproj`:
        - select WebDriverAgent in folder structure
        - select "Singing & Capabilities" in the tab
        - in target section select WebDriverAgentRunner
        - in "Signing" section, select Team in the dropdown (you should be able to select your presigned apple account, if it is not there you can add it in XCode Settings in Account tab)
        - in "Signing" section, define unique name for "Bundle Identifier"


