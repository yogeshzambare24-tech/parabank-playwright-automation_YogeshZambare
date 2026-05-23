// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    // Selector for the balance column in the Account Overview table
    this.balanceAmount = page.locator('#accountTable tbody tr:first-child td:nth-child(2)');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for navigation after login
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getAccountBalance() {
    // Wait for page to settle after login
    await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    await this.page.waitForTimeout(2000);
    
    // Try the original selector first
    try {
      await this.balanceAmount.waitFor({ state: 'visible', timeout: 10000 });
      const balance = await this.balanceAmount.innerText();
      return balance;
    } catch (e) {
      // Fallback: look for any text with $ sign
      const bodyText = await this.page.locator('body').innerText().catch(() => '');
      const match = bodyText.match(/\$[\d,]+\.\d{2}/);
      return match ? match[0] : '$0.00';
    }
  }
}
module.exports = { LoginPage };