import { test } from '@playwright/test';
import { LocationPage } from '../../pages/LocationPage.js';
import locationData from '../../test-data/locationData.json' assert { type: 'json' };

test.describe('Location Module - Functional and Regression Test Suite', () => {
let locationPage;

test.beforeEach(async ({ page }) => {
  locationPage = new LocationPage(page);
  await locationPage.navigateToLocationGrid();
});

/* ----------------------- Grid ----------------------- */

test('TC001 – Verify location grid is displayed', async () => {
  await locationPage.verifyLocationGridDisplayed();
});

test('TC002 – Verify grid column headers are displayed', async () => {
  await locationPage.verifyColumnHeadersPresence();
});

test('TC003 – Verify grid displays the expected number of rows', async () => {
  await locationPage.verifyRowCount(locationData.expectedRowCount);
});

/* ----------------------- Sorting ----------------------- */

test('TC004 – Verify sorting the grid by last name', async () => {
  await locationPage.sortByLastName();
  await locationPage.verifyLastNameSortedAscending();
});

/* ----------------------- Record Lookup ----------------------- */

test('TC005 – Verify a known record exists in the grid', async () => {
  await locationPage.verifyRecordExistsByEmail(locationData.knownEmail);
});
});
