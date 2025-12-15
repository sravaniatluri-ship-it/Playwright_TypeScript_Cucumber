import type { Page, Locator } from "playwright";
import { BasePage } from "./BasePage.js";
import { CONSTANT_WAIT } from  "../helper/Timeout.js";  

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly cartItemName: Locator;
  readonly cartItemQuantity: Locator;
  readonly cartItemPrice: Locator;
  readonly cartItemRemoveButtons: Locator;
  readonly cartTotal: Locator;
  readonly cartItemNullState: Locator;
  readonly cartDeleteButton: Locator;

  readonly increaseQuantityButtons: Locator;
  //readonly decreaseQuantityButtons: Locator;

  readonly proceedToCheckoutButton: Locator;
  //readonly BillingproceedToCheckoutButton: Locator;
  readonly cartEmptyMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('tr[class="ng-star-inserted"]');
    this.cartItemName = page.locator('[data-test="product-title"]');
    this.cartItemQuantity = page.locator('[data-test="product-quantity"]');
    this.cartItemPrice = page.locator('[data-test="product-price"]');
    this.cartItemRemoveButtons = page.locator('[data-test="cart-item-remove"]');
   this.cartTotal = page.locator('[data-test="cart-total"]');
    this.cartItemNullState = page.locator('[data-test="cart-empty"]');
   
    this.increaseQuantityButtons = page.locator('[data-test="cart-item-qty-increase"]');
   // this.decreaseQuantityButtons = page.locator('[data-test="cart-item-qty-decrease"]');
    this.cartDeleteButton = page.locator(".btn.btn-danger");
    this.cartEmptyMessage = page.locator('text=The cart is empty. Nothing to display.');
    this.proceedToCheckoutButton = page.getByText('Proceed to Checkout');
   //this.BillingproceedToCheckoutButton = page.locator("//h3[text()='Billing Address']//parent::div//button[text()='Proceed to checkout ']");



  }

  async gotoCart() {
    await this.goto("/#/cart");
  }

  async removeFirstItem() {
    await this.cartItemRemoveButtons.first().click();
  }

  async increaseFirstItemQuantity() {
    await this.increaseQuantityButtons.first().click();
  }

 // async decreaseFirstItemQuantity() {
   // await this.decreaseQuantityButtons.first().click();
  //}
  async deleteSelectedItem() {
    await this.cartDeleteButton.click();
        await this.delay(CONSTANT_WAIT.MEDIUM);
        await this.waitForPageLoad("networkidle");
        await this.waitForPageLoad("load");
  }

 async getTotalText() {
    return this.cartTotal.innerText();
  }

  async proceedToCheckout(index: number = 0) {
    await this.proceedToCheckoutButton.nth(index).click();

  }
  //async proceedToBillingCheckout() {
   // await this.BillingproceedToCheckoutButton.click();
  //}
  async getEmptyCartMessageText(text?: string) {
    return this.cartEmptyMessage.innerText();
  }

}
