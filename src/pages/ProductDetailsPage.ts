import type { Page, Locator } from "playwright";
import { BasePage } from "./BasePage.js";

export class ProductDetailsPage extends BasePage {
  readonly name: Locator;
  readonly image1: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly image: Locator;
   readonly unitPrice: Locator;
  readonly addToCartButton: Locator;
  readonly quantity: Locator;
  readonly qtyInput: Locator;
  readonly qtyIncrease: Locator;
  readonly qtyDecrease: Locator;
 

  constructor(page: Page) {
    super(page);
    this.name = page.locator('[data-test="product-name"]');
    this.description = page.locator('[data-test="product-description"]');
    this.price = page.locator('[data-test="product-price"]');
    this.unitPrice = page.locator('[data-test="unit-price"]');
    this.image = page.locator("img.product-image");
    this.image1 = page.locator(".figure-img");
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.quantity=page.locator('[data-test="product-quantity"]');
    this.qtyInput = page.locator('[data-test="quantity"]');
    this.qtyIncrease = page.locator('[data-test="increase-quantity"]');
    this.qtyDecrease = page.locator('[data-test="decrease-quantity"]');
  
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async viewQuantity() {
    await this.quantity.isVisible();
  }
  
  async getQuantity(): Promise<number> {
    const qtyValue = await this.qtyInput.inputValue();
    return parseInt(qtyValue, 10);
  }

  async increaseOnce() {
    await this.qtyIncrease.click();
  }

  async decreaseOnce() {
    await this.qtyDecrease.click();
  }
}
