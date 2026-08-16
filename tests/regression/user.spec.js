import { test, expect } from '@playwright/test';
import { UsersPage } from '../../pages/UsersPage.js';
import userData from '../../test-data/userData.json' assert { type: 'json' };

test.describe('User Registration Module - Functional and Regression Test Suite', () => {
let userPage;

test.beforeEach(async ({ page }) => {
  userPage = new UsersPage(page);
  await userPage.navigateToRegistrationPage();
});

/* ----------------------- Field Presence ----------------------- */

test('TC001 – Verify First Name field presence', async () => {
  await userPage.verifyFirstNameFieldPresence();
});

test('TC002 – Verify Last Name field presence', async () => {
  await userPage.verifyLastNameFieldPresence();
});

test('TC003 – Verify Email field presence', async () => {
  await userPage.verifyEmailFieldPresence();
});

test('TC004 – Verify Mobile Number field presence', async () => {
  await userPage.verifyMobileNumberFieldPresence();
});

test('TC005 – Verify Submit button presence', async () => {
  await userPage.verifySubmitButtonPresence();
});

/* ----------------------- Field Behaviour ----------------------- */

test('TC006 – Verify First Name accepts input', async () => {
  await userPage.verifyFirstNameAcceptsInput(userData.validUser.firstName);
});

test('TC007 – Verify Last Name accepts input', async () => {
  await userPage.verifyLastNameAcceptsInput(userData.validUser.lastName);
});

test('TC008 – Verify Mobile Number accepts only digits', async () => {
  await userPage.verifyMobileNumberAcceptsOnlyDigits(userData.validUser.mobileNumber);
});

test('TC009 – Verify Mobile Number max length boundary', async () => {
  await userPage.verifyMobileNumberMaxLength(userData.invalidMobileNumber);
});

test('TC010 – Verify Gender options are displayed', async () => {
  await userPage.verifyGenderOptionsPresence();
});

test('TC011 – Verify hobby checkbox toggling', async () => {
  await userPage.verifyHobbyCheckboxToggling();
});

/* ----------------------- Form Validation ----------------------- */

test('TC012 – Verify mandatory fields are highlighted on empty submit', async () => {
  await userPage.verifyMandatoryFieldsHighlightedOnEmptySubmit();
});

test('TC013 – Verify invalid email format is highlighted', async () => {
  await userPage.verifyInvalidEmailIsHighlighted(userData.invalidEmail);
});

/* ----------------------- Registration Flow ----------------------- */

test('TC014 – Verify registration form can be submitted with valid mandatory details', async () => {
  await userPage.fillMandatoryDetails(userData.validUser);
  await userPage.submitRegistration();
});
});
