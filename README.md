# ParaBank Test Automation Suite

A comprehensive end-to-end test automation framework for ParaBank using Playwright and the Page Object Model design pattern.

## Project Overview

This project implements automated testing for the ParaBank application with the following capabilities:
- User registration automation
- User login validation
- Account balance verification
- End-to-end workflow testing

## Project Structure

```
├── pages/                          # Page Object Models
│   ├── LoginPage.js               # Login page abstraction
│   └── RegisterPage.js            # Registration page abstraction
├── tests/                          # Test specifications
│   └── parabank.spec.js           # E2E test suite
├── playwright-report/             # HTML test reports
├── test-results/                  # Test execution results
├── package.json                   # Project dependencies
├── playwright.config.js           # Playwright configuration
└── README.md                       # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Playwright browser dependencies

## Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

This will install:
- Playwright v1.60.0
- Playwright Test (@playwright/test v1.60.0)
- All required browser engines

## Configuration

The project uses `playwright.config.js` for test configuration. Key settings:
- **Headless mode**: Tests run in headless mode by default
- **Headed mode**: Run tests with visible browser using `--headed` flag
- **Timeouts**: Configured per test needs
- **Retries**: Set to 0 for single execution

## Running Tests

### Execute all tests in headless mode:
```bash
npx playwright test
```

### Execute tests with visible browser (headed mode):
```bash
npx playwright test --headed
```

### Execute specific test file:
```bash
npx playwright test tests/parabank.spec.js
```

### Execute tests with debug information:
```bash
npx playwright test --debug
```

## Test Details

### ParaBank Sign-Up and Login Flow Test
**File**: `tests/parabank.spec.js`

**Test Workflow**:
1. User registration with unique credentials
2. Successful account creation verification
3. User logout
4. Fresh login with registered credentials
5. Account balance retrieval and validation

**Test User Data**:
- First Name: Yogi
- Last Name: Engineer
- Address: 123 Tech Street
- City: Chhatrapati Sambhajinagar
- State: Maharashtra
- ZIP: 431001
- SSN: 999-99-9999
- Dynamic username (uses timestamp to ensure uniqueness)
- Password: Password@123

**Expected Result**: Test passes with successful balance retrieval

## Page Object Models

### RegisterPage.js
Encapsulates all registration-related interactions:
- `navigate()` - Navigate to registration page
- `registerNewUser(userDetails)` - Fill and submit registration form
- `logout()` - Log out the current user

### LoginPage.js
Encapsulates all login-related interactions:
- `login(username, password)` - Authenticate with credentials
- `getAccountBalance()` - Retrieve and return account balance

## Test Reports

After test execution, view the HTML report:
```bash
npx playwright show-report
```

Test results are stored in:
- `test-results/` - JSON and text reports
- `playwright-report/` - Interactive HTML report

## Troubleshooting

### Tests timeout
- Increase timeout in playwright.config.js
- Check internet connection to ParaBank application

### Element not found errors
- Verify ParaBank application URL in page navigation
- Check if page selectors have changed
- Use `--debug` flag to inspect element locations

### Registration failures
- Username conflicts: The project uses timestamp-based unique usernames
- Account with username already exists error indicates replay of test with same data

## Development

### Adding new tests
1. Create new test file in `tests/` directory
2. Import required page objects
3. Use `test()` from `@playwright/test`
4. Follow existing test structure

### Extending page objects
1. Add new methods to relevant page class
2. Use Playwright locators for element selection
3. Keep selectors flexible for maintainability

## Dependencies

```json
{
  "dependencies": {
    "playwright": "^1.60.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.60.0"
  }
}
```

## License

This project is part of test automation training and development.

## Support

For issues or questions regarding test execution, refer to:
- [Playwright Documentation](https://playwright.dev)
- Playwright Test Debugging: `npx playwright test --debug`
- HTML Reports: `npx playwright show-report`
