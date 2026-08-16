import { BasePage } from './BasePage.js';
import { ENV } from '../utils/env.js';
import { expect } from '@playwright/test';

export class UsersPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Locators
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.genderMaleLabel = page.locator('label[for="gender-radio-1"]');
    this.genderFemaleLabel = page.locator('label[for="gender-radio-2"]');
    this.mobileNumberInput = page.locator('#userNumber');
    this.hobbySportsLabel = page.locator('label[for="hobbies-checkbox-1"]');
    this.hobbyReadingLabel = page.locator('label[for="hobbies-checkbox-2"]');
    this.currentAddressTextarea = page.locator('#currentAddress');
    this.submitButton = page.locator('#submit');
  }

  /* ----------------------- Navigation ----------------------- */

  async navigateToRegistrationPage() {
    await this.page.goto(ENV.REGISTER_URL);
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  /* ----------------------- Field Presence ----------------------- */

  async verifyFirstNameFieldPresence() {
    await expect(this.firstNameInput).toBeVisible();
  }

  async verifyLastNameFieldPresence() {
    await expect(this.lastNameInput).toBeVisible();
  }

  async verifyEmailFieldPresence() {
    await expect(this.emailInput).toBeVisible();
  }

  async verifyMobileNumberFieldPresence() {
    await expect(this.mobileNumberInput).toBeVisible();
  }

  async verifySubmitButtonPresence() {
    await expect(this.submitButton).toBeVisible();
  }

  /* ----------------------- Field Behaviour ----------------------- */

  async verifyFirstNameAcceptsInput(value) {
    await this.firstNameInput.fill(value);
    await expect(this.firstNameInput).toHaveValue(value);
  }

  async verifyLastNameAcceptsInput(value) {
    await this.lastNameInput.fill(value);
    await expect(this.lastNameInput).toHaveValue(value);
  }

  async verifyMobileNumberAcceptsOnlyDigits(value) {
    await this.mobileNumberInput.fill(value);
    const actual = await this.mobileNumberInput.inputValue();
    expect(actual).toMatch(/^\d*$/);
  }

  async verifyMobileNumberMaxLength(value) {
    await this.mobileNumberInput.fill(value);
    const actual = await this.mobileNumberInput.inputValue();
    expect(actual.length).toBeLessThanOrEqual(10);
  }

  async verifyGenderOptionsPresence() {
    await expect(this.genderMaleLabel).toBeVisible();
    await expect(this.genderFemaleLabel).toBeVisible();
  }

  async selectGender(option) {
    const target = option === 'Female' ? this.genderFemaleLabel : this.genderMaleLabel;
    await target.click();
  }

  async verifyHobbyCheckboxToggling() {
    await this.hobbySportsLabel.click();
    await expect(this.page.locator('#hobbies-checkbox-1')).toBeChecked();
    await this.hobbySportsLabel.click();
    await expect(this.page.locator('#hobbies-checkbox-1')).not.toBeChecked();
  }

  /* ----------------------- Form Validation ----------------------- */

  async verifyMandatoryFieldsHighlightedOnEmptySubmit() {
    await this.submitButton.click();
    await expect(this.firstNameInput).toHaveClass(/is-invalid/);
    await expect(this.lastNameInput).toHaveClass(/is-invalid/);
  }

  async verifyInvalidEmailIsHighlighted(invalidEmail) {
    await this.emailInput.fill(invalidEmail);
    await this.submitButton.click();
    await expect(this.emailInput).toHaveClass(/is-invalid/);
  }

  /* ----------------------- Registration Flow ----------------------- */

  async fillMandatoryDetails({ firstName, lastName, email, mobileNumber }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.genderMaleLabel.click();
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async submitRegistration() {
    await this.submitButton.click();
  }
}
