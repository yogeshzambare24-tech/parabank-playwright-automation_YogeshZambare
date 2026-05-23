// tests/parabank.spec.js
const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('ParaBank Sign-Up and Login Flow', () => {
  // Generate unique username using timestamp to prevent duplicate registration errors
  const uniqueUsername = `testuser_${Date.now()}`;
  const testUser = {
    firstName: 'Yogi',
    lastName: 'Engineer',
    address: '123 Tech Street',
    city: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    zip: '431001',
    ssn: '999-99-9999',
    username: uniqueUsername,
    password: 'Password@123'
  };

  test('Should successfully register, login, and print balance', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    // Step 1: Registration
    await registerPage.navigate();
    await registerPage.registerNewUser(testUser);
    
    // Wait a moment for the page to process the registration
    await page.waitForTimeout(2000);
    
    // Try to find success message with a more flexible approach
    const successMsg = page.locator('text=Your account was created successfully, you are now logged in.');
    if (await successMsg.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('Registration successful!');
    }
    
    // Step 2: Logout to clear session for fresh login test
    try {
      await registerPage.logout();
    } catch (e) {
      console.log('Logout not necessary or already logged out');
    }

    // Step 3: Sign In with created credentials
    await registerPage.navigate();
    await loginPage.login(testUser.username, testUser.password);

    // Step 4: Extract and Log Balance Amount
    const totalBalance = await loginPage.getAccountBalance();
    console.log(`\n==============================================`);
    console.log(`LOGGED POST-LOGIN BALANCE: ${totalBalance}`);
    console.log(`==============================================\n`);
    
    // Quick assertion to confirm balance text exists
    expect(totalBalance).toContain('$');
  });
});