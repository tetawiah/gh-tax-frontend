# Introduction

The Salary Calculator app is built using Expo, a framework and platform for universal React applications. It simplifies the development process by providing tools to build, deploy, and manage React Native applications.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (or yarn)
- Expo CLI (`npm install -g expo-cli`)

## Getting Started

### Clone the Repository

git clone https://github.com/tetawiah/gh-tax-frontend
cd gh-tax-frontend

Install Dependencies
--------------------

Install the necessary dependencies:

`yarn install`

Run the App
-----------

Start the Expo development server:

`expo start`

This command launches the Expo DevTools in your default browser.

Project Structure
-----------------

The project structure is organized as follows:

-   `/app`: Contains the main application code.
-   `/tests`: Contains test files.
-   `package.json`: Dependencies and scripts.

Features
--------

### 1\. Salary Calculation

The app calculates gross salary based on net salary, tax deductions, and allowances.

### 2\. Allowance Management

Users can add desired allowances such as housing, transport, and etc.

### 3\. Tax Calculation

Automatically calculates PAYE(Pay As You Earn) tax based on the user's income.

Usage
-----

1.  Open the app.
2.  Enter the net salary.
3.  Add allowances by specifying the name of the allowance and the corresponding amount.
4.  Click "Calculate" to view net salary and tax details.

Running Tests

-------------

To run tests, use the following command:

`npm test`

Ensure Jest is properly configured to run tests with appropriate mocks and assertions.
