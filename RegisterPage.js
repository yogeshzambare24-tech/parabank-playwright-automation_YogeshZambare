// pages/RegisterPage.js
class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.locator('text=Register');
    this.firstNameInput = page.locator('input[id="customer.firstName"]');
    this.lastNameInput = page.locator('input[id="customer.lastName"]');
    this.addressInput = page.locator('input[id="customer.address.street"]');
    this.cityInput = page.locator('input[id="customer.address.city"]');
    this.stateInput = page.locator('input[id="customer.address.state"]');
    this.zipCodeInput = page.locator('input[id="customer.address.zipCode"]');
    this.ssnInput = page.locator('input[id="customer.ssn"]');
    this.usernameInput = page.locator('input[id="customer.username"]');
    this.passwordInput = page.locator('input[id="customer.password"]');
    this.confirmPasswordInput = page.locator('input[id="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
    this.successMessage = page.locator('text=Your account was created successfully.');
    this.logoutLink = page.locator('text=Log Out');
  }

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC', { waitUntil: 'domcontentloaded' });
  }

  async registerNewUser(user) {
    await this.registerLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.registerLink.click();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zip);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async logout() {
    await this.logoutLink.click();
  }
}
module.exports = { RegisterPage };