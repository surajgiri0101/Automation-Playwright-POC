export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(urlPath) {
    await this.page.goto(urlPath);
  }

  async click(locator) {
    await this.page.locator(locator).click();
  }

  async fill(locator, value) {
    await this.page.locator(locator).fill(value);
  }

  async getText(locator) {
    return await this.page.locator(locator).innerText();
  }

  async selectDropdownOption(dropdownLocator, value) {
    await dropdownLocator.selectOption(value);
  }
}
