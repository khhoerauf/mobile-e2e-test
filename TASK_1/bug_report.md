# Bug Report

## Title: Incorrect Balance Display for Expense Below 0%

### Description:

When an expense is calculated to be below 1% compared to other expense, the app incorrectly displays it as 0%. Additionally, these expenses are sometimes not correctly linked to their respective category, leading to misrepresentation of financial data.

### Steps to Reproduce:

1. Go to Balance page
2. Add income 2,000$
3. Click on House icon and add expense 1,258$
4. Click on Communications icon and add expense 8$
5. Click on Gift icon and add expense 5$

#### Actual :

- Gift icon has 0% and it is not linked to piegraph icon.

<img width="250" alt="Screenshot 2024-11-27 at 9 12 23 AM" src="https://github.com/user-attachments/assets/ecef6b2a-83f5-40ea-8995-4d3c09fad4f6">


#### Expected :

- Gift icon should be linked to piegraph icon. Potentially expenses less than 0% display as "< 1%".
