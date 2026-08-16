import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductPage } from '../../pages/ProductPage.js';
import loginData from '../../test-data/loginData.json' assert { type: 'json' };
import productData from '../../test-data/productData.json' assert { type: 'json' };

test.describe('Inventory Module - Functional and Regression Test Suite', () => {
let loginPage;
let productPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);

  const { username, password } = loginData.validCredentials;
  await page.goto('/');
  await loginPage.loginWithValidCredentials(username, password);
  await loginPage.LandingOnProductPage();
});

/* ----------------------- Grid / Listing ----------------------- */

test('TC001 – Verify product grid is displayed', async () => {
  await productPage.verifyProductGridDisplayed();
});

test('TC002 – Verify sort dropdown options', async () => {
  await productPage.verifySortDropdownOptions();
});

test('TC003 – Verify sorting products by price low to high', async () => {
  await productPage.sortByPriceLowToHigh();
  await productPage.verifyPricesAreSortedAscending();
});

test('TC004 – Verify sorting products by name Z to A', async () => {
  await productPage.sortByNameZToA();
  await productPage.verifyNamesAreSortedDescending();
});

/* ----------------------- Cart ----------------------- */

test('TC005 – Verify adding a product to the cart', async () => {
  await productPage.addFirstItemToCart();
  await productPage.verifyCartBadgeCount(1);
});

test('TC006 – Verify removing a product from the cart', async () => {
  await productPage.addFirstItemToCart();
  await productPage.removeFirstItemFromCart();
  await productPage.verifyCartBadgeCount(0);
});

test('TC007 – Verify cart reflects the correct item count', async () => {
  await productPage.addFirstItemToCart();
  await productPage.addItemToCartByName(productData.items.primary);
  await productPage.openCart();
  await productPage.verifyCartItemCount(2);
});

/* ----------------------- Checkout ----------------------- */

test('TC008 – Verify checkout requires mandatory fields', async () => {
  await productPage.addFirstItemToCart();
  await productPage.openCart();
  await productPage.proceedToCheckout();
  await productPage.verifyCheckoutMandatoryFieldError('First Name is required');
});

test('TC009 – Verify order summary is shown after checkout info step', async () => {
  const { firstName, lastName, postalCode } = productData.checkoutInfo;
  await productPage.addFirstItemToCart();
  await productPage.openCart();
  await productPage.proceedToCheckout();
  await productPage.fillCheckoutInfo(firstName, lastName, postalCode);
  await productPage.verifyOrderSummaryVisible();
});

test('TC010 – Verify completing checkout shows confirmation message', async () => {
  const { firstName, lastName, postalCode } = productData.checkoutInfo;
  await productPage.addFirstItemToCart();
  await productPage.openCart();
  await productPage.proceedToCheckout();
  await productPage.fillCheckoutInfo(firstName, lastName, postalCode);
  await productPage.finishCheckout();
  await productPage.verifyOrderCompleteMessage();
});
});
