# Exploratory Testing

```
All scenarios can be found in TASK_1/exploratory_chart.pdf, below copy with screenshots.
```

## Test Scope

Perform an exploratory testing session of the Monefy mobile application (non-premium version). Focus primarily on the core functionality, specifically the ability to add
and modify income or expenses. These actions should be correctly reflected in the Balance view.
Additionally, test the calendar filtering feature to ensure the Balance view updates accordingly. Finally, verify the functionality of other easily accessible views in the
navigation menu.

## Test Environment

1. Android v14.0
2. Monefy App v1.18.0 - https://play.google.com/store/apps/details?id=com.monefy.app.lite
3. Internet connection WIFi
4. Emulator Pixel 7
5. 412px × 915px viewport

## Risks

1. The application should clearly communicate the differences between the premium and free versions to avoid user frustration.
2. Ensure the UI is intuitive. Some notification tooltips have a cancel button, but the message is unclear as it may perform a revert action.
3. Security, users can store sensitive data (such as income, expenses, and financial details). It is crucial to properly store user data in secure databases and avoid exposing sensitive information.

## Prioritized & Identified Defects/Improvements

1. Scenario: always display correct balance

   Issue: In cases where an expense is below 0% compared to other expenses, the app incorrectly displays 0%. Additionally, sometimes that expense is not correctly
   linked to their respective category.

   Impact: This can lead to misunderstandings about the current balance, which is a critical function of the app.

   Priority: High

   <img width="250" alt="Screenshot 2024-11-27 at 8 55 24 AM" src="https://github.com/user-attachments/assets/25d97217-0d1b-468c-b6f9-06817ce4dc63">

   Example of bug report can be found `/TASK_1/bug_report.md`

2. Scenario: Should allow the user to cancel any unwanted action

   Issue: After adding income or an expense, the notification banner remains visible for approximately 20 seconds, which is excessive. It can interupt access to other part of application, eg: setting part. Furthermore, the "Cancel" button currently reverts the change instead of dismissing the banner. This behavior is misleading.

   Improvement Suggestion: Update the button text to "Revert" to clarify its function.

   Priority: Medium

   <img width="250" alt="Screenshot 2024-11-26 at 11 12 05 AM" src="https://github.com/user-attachments/assets/68c77be9-e0f1-4339-9738-44dcdd91be42">

3. Scenario: should allow to open right side modal

   Issue: The application is unintuitive regarding currency-related sections. One section is exclusive to premium members, while the other allows currency modification
   for all users. Additionally, there is no indication that currency changes do not automatically account for exchange rate conversions.

   Improvement Suggestion: Add clarifications and tooltips to inform users about the limitations of currency modifications.

   Priority: Low

4. Scenario: Should allow the user to search by previously added note

   Issue: The visual experience during note searches is slightly disrupted. While this has minimal impact on usability, it detracts from the overall experience.

   Priority: Low

   <img width="250" alt="Screenshot 2024-11-26 at 10 51 06 AM" src="https://github.com/user-attachments/assets/4c0a846e-3c6c-4ff7-befa-882ccfc6bb8f">
