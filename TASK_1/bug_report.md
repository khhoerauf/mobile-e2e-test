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

#### Expected :

- Gift icon should be linked to piegraph icon. Potentially expenses less than 0% display as "< 0%".
