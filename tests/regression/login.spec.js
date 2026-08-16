import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ENV } from '../../utils/env.js';
import loginData from '../../test-data/loginData.json' assert { type: 'json' };

test.describe('Login Functionality Tests', () => {
let loginPage;

/* ----------------------- Test Setup ----------------------- */
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto(`${ENV.BASE_URL}/`);
  await page.locator(loginPage.username).waitFor({
    state: 'visible',
    timeout: 15000
  });
});

/* ----------------------- UI & Field Validation ----------------------- */

test('TC001: Verify all login page elements are displayed', async () => {
  await loginPage.verifyLoginElements();
});

test('TC002: Verify Username field accepts input', async ({ page }) => {
  const username = loginData.testData.validUsername;
  await page.locator(loginPage.username).fill(username);
  await expect(page.locator(loginPage.username)).toHaveValue(username);
});

test('TC003: Verify Password field is masked', async ({ page }) => {
  const password = loginData.testData.validPassword;
  await page.locator(loginPage.password).fill(password);
  await expect(page.locator(loginPage.password)).toHaveAttribute('type', 'password');
});

test('TC004: Verify Username field max length boundary', async () => {
  await loginPage.verifyUsernameMaxLength(loginData.testData.longUsername);
});

/* ----------------------- Login Scenarios ----------------------- */

test('TC005: Verify login with valid credentials', async () => {
  const { username, password } = loginData.validCredentials;
  await loginPage.loginWithValidCredentials(username, password);
  await loginPage.LandingOnInventoryPage();
});

test('TC006: Verify login with invalid username', async () => {
  const { username, password } = loginData.invalidUsernameCredentials[0];
  await loginPage.loginWithInvalidCredentials(username, password);
  await loginPage.verifyErrorMessage('Username and password do not match');
});

test('TC007: Verify login with invalid password', async () => {
  const { username, password } = loginData.invalidPasswordCredentials[0];
  await loginPage.loginWithInvalidCredentials(username, password);
  await loginPage.verifyErrorMessage('Username and password do not match');
});

test('TC008: Verify login is blocked for a locked-out user', async () => {
  const { username, password } = loginData.lockedOutCredentials[0];
  await loginPage.loginWithInvalidCredentials(username, password);
  await loginPage.verifyErrorMessage('locked out');
});

test('TC009: Verify login with blank username', async () => {
  await loginPage.verifyBlankUsername(loginData.testData.validPassword);
});

test('TC010: Verify login with blank password', async () => {
  await loginPage.verifyBlankPassword(loginData.testData.validUsername);
});

test('TC011: Verify login with both fields blank', async () => {
  await loginPage.verifyBothFieldsBlank();
});

test('TC012: Verify error message can be dismissed', async () => {
  const { username, password } = loginData.invalidUsernameCredentials[0];
  await loginPage.loginWithInvalidCredentials(username, password);
  await loginPage.verifyErrorCanBeDismissed();
});

/* ----------------------- Session ----------------------- */

test('TC013: Verify logout returns to the login page', async ({ page }) => {
  const { username, password } = loginData.validCredentials;
  await loginPage.loginWithValidCredentials(username, password);
  await loginPage.LandingOnInventoryPage();
  await loginPage.logout();
  await expect(page.locator(loginPage.loginButton)).toBeVisible();
});
});
