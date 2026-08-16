import { BasePage } from './BasePage.js';
import { ENV } from '../utils/env.js';
import { expect } from '@playwright/test';

export class LocationPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Locators
    this.pageHeading = page.locator('h3');
    this.tableRows = page.locator('#table1 tbody tr');
    this.emailColumnHeader = page.locator('#table1 th', { hasText: 'Email' });
    this.lastNameColumnHeader = page.locator('#table1 th', { hasText: 'Last Name' });
  }

  /* ----------------------- Navigation ----------------------- */

  async navigateToLocationGrid() {
    await this.page.goto(ENV.LOCATION_URL);
    await this.tableRows.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  /* ----------------------- Grid Verification ----------------------- */

  async verifyLocationGridDisplayed() {
    await expect(this.tableRows).not.toHaveCount(0);
  }

  async verifyColumnHeadersPresence() {
    await expect(this.emailColumnHeader).toBeVisible();
    await expect(this.lastNameColumnHeader).toBeVisible();
  }

  async verifyRowCount(expectedCount) {
    await expect(this.tableRows).toHaveCount(expectedCount);
  }

  /* ----------------------- Sorting ----------------------- */

  async sortByLastName() {
    await this.lastNameColumnHeader.click();
  }

  async verifyLastNameSortedAscending() {
    const lastNames = await this.page
      .locator('#table1 tbody tr td:nth-child(1)')
      .allTextContents();
    const sorted = [...lastNames].sort();
    expect(lastNames).toEqual(sorted);
  }

  /* ----------------------- Record Lookup ----------------------- */

  async verifyRecordExistsByEmail(email) {
    const row = this.tableRows.filter({ hasText: email });
    await expect(row).toHaveCount(1);
  }
}
