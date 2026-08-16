import { BasePage } from './BasePage.js';
import { ENV } from '../utils/env.js';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {

  /* ----------------------- Constructor & Locators ----------------------- */

  constructor(page) {
    super(page);

    // Login Fields
    this.username = '#user-name';
    this.password = '#password';
    this.loginButton = '#login-button';

    // Errors
    this.errorMessage = '[data-test="error"]';
    this.errorCloseButton = '.error-button';

    // Post-login landmarks
    this.pageTitle = '.title';
    this.burgerMenuButton = '#react-burger-menu-btn';
    this.logoutLink = '#logout_sidebar_link';
  }

  /* ----------------------- Login Actions ----------------------- */

  async login() {
    await this.page.goto(`${ENV.BASE_URL}/`);
    await this.fill(this.username, ENV.USERNAME);
    await this.fill(this.password, ENV.PASSWORD);
    await this.page.locator(this.loginButton).click();
  }

  async loginWithValidCredentials(username, password) {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.page.locator(this.loginButton).click();
  }

  async loginWithInvalidCredentials(username, password) {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.page.locator(this.loginButton).click();
  }

  async logout() {
    await this.page.locator(this.burgerMenuButton).click();
    await this.page.locator(this.logoutLink).click();
  }

  /* ----------------------- Validation Scenarios ----------------------- */

  async verifyBlankUsername(password) {
    await this.fill(this.password, password);
    await this.page.locator(this.loginButton).click();
    await this.verifyErrorMessage('Username is required');
  }

  async verifyBlankPassword(username) {
    await this.fill(this.username, username);
    await this.page.locator(this.loginButton).click();
    await this.verifyErrorMessage('Password is required');
  }

  async verifyBothFieldsBlank() {
    await this.page.locator(this.loginButton).click();
    await this.verifyErrorMessage('Username is required');
  }

  async verifyErrorMessage(expectedText) {
    const error = this.page.locator(this.errorMessage);
    await expect(error).toBeVisible();
    await expect(error).toContainText(expectedText);
  }

  async verifyErrorCanBeDismissed() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    await this.page.locator(this.errorCloseButton).click();
    await expect(this.page.locator(this.errorMessage)).toBeHidden();
  }

  /* ----------------------- Common Helpers ----------------------- */

  async verifyLoginElements() {
    await expect(this.page.locator(this.username)).toBeVisible();
    await expect(this.page.locator(this.password)).toBeVisible();
    await expect(this.page.locator(this.loginButton)).toBeVisible();
  }

  async verifyUsernameMaxLength(value) {
    await this.fill(this.username, value);
    const actual = await this.page.locator(this.username).inputValue();
    expect(actual.length).toBe(value.length);
  }

  async LandingOnInventoryPage() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator(this.pageTitle)).toHaveText('Products');
  }
}
