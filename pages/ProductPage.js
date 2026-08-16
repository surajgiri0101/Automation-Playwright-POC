import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Locators
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemPrices = page.locator('.inventory_item_price');
    this.itemNames = page.locator('.inventory_item_name');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });

    // Checkout form
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.checkoutErrorMessage = page.locator('[data-test="error"]');
    this.completeHeader = page.locator('.complete-header');
    this.summaryTotalLabel = page.locator('.summary_total_label');
  }

  /* ----------------------- Grid / Listing ----------------------- */

  async verifyProductGridDisplayed() {
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryItems).not.toHaveCount(0);
  }

  async verifySortDropdownOptions() {
    const optionTexts = await this.sortDropdown.locator('option').allTextContents();
    const expectedValues = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)'];

    for (const value of expectedValues) {
      expect(optionTexts).toContain(value);
    }
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async sortByNameZToA() {
    await this.sortDropdown.selectOption('za');
  }

  async verifyPricesAreSortedAscending() {
    const prices = await this.itemPrices.allTextContents();
    const values = prices.map((p) => parseFloat(p.replace('$', '')));
    const sorted = [...values].sort((a, b) => a - b);
    expect(values).toEqual(sorted);
  }

  async verifyNamesAreSortedDescending() {
    const names = await this.itemNames.allTextContents();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  }

  /* ----------------------- Cart ----------------------- */

  async addFirstItemToCart() {
    await this.inventoryItems.first().getByRole('button', { name: 'Add to cart' }).click();
  }

  async addItemToCartByName(itemName) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFirstItemFromCart() {
    await this.inventoryItems.first().getByRole('button', { name: 'Remove' }).click();
  }

  async verifyCartBadgeCount(expectedCount) {
    if (expectedCount === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(expectedCount));
    }
  }

  async openCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/cart.html/);
  }

  async verifyCartItemCount(expectedCount) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  /* ----------------------- Checkout ----------------------- */

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async verifyCheckoutMandatoryFieldError(expectedText) {
    await this.continueButton.click();
    await expect(this.checkoutErrorMessage).toBeVisible();
    await expect(this.checkoutErrorMessage).toContainText(expectedText);
  }

  async verifyOrderSummaryVisible() {
    await expect(this.summaryTotalLabel).toBeVisible();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async verifyOrderCompleteMessage() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
