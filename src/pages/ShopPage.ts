import type { Page, Locator } from "playwright";
import { BasePage } from "./BasePage.js";

export class ShopPage extends BasePage {
 readonly homeLink: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productImages: Locator;

  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly noResultsMessage: Locator;
  readonly sort: Locator;

  constructor(page: Page) {
    super(page);
    //product Locators
    this.homeLink = page.locator('[data-test="nav-home"]');
    this.productCards = page.locator('[data-test="product-name"]'); 
    this.productNames = page.locator('[data-test="product-name"]');
    this.productPrices = page.locator('[data-test="product-price"]');
    this.productImages = page.locator(".card-img-top");
    this.sort =page.locator(".img-fluid");   
    // Search locators
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmitButton = page.locator('[data-test="search-submit"]');
    this.noResultsMessage = page.locator('[data-test="no-results"]')
  }
  async gotoShop() {
    //await this.homeLink.click();
    await this.goto("/#/");
  }
  async gotoHomePage() {
    await this.click(this.homeLink);
  }

  async openFirstProduct() {
    await this.productCards.first().click();
  }

  async clickProductByName(name: string) {
    await this.productNames.filter({ hasText: name }).first().click();
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.click(this.searchSubmitButton)
    //await this.searchSubmitButton.click();
  }
}
