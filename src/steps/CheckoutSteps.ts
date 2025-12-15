import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

export class CheckoutSteps {
  constructor(private world: CustomWorld) { }

  async proceedToCheckout(index: number = 0) {
    const { cartPage } = this.world.pm;
    await cartPage.proceedToCheckout(index);
  }

  async completeCheckoutWithValidData(streetname: string, city: string, state: string, country: string, postcode: string) {
    const { checkoutPage } = this.world.pm;
    await checkoutPage.fillValidbillingDetails(streetname, city, state, country, postcode);
    await this.proceedToCheckout(3);
  }

  async completePaymentWithValidDetails() {
    const { checkoutPage } = this.world.pm;
    await checkoutPage.fillValidPaymentDetails();
    await checkoutPage.confirmOrder();
    await expect(checkoutPage.confirmationMessage).toBeVisible();
    await checkoutPage.confirmOrder();
  }
  async shouldSeeOrderConfirmation() {
    const { checkoutPage } = this.world.pm;
    await expect(checkoutPage.orderConfirmation).toBeVisible();
  }

  async shouldSeePaymentConfirmation() {
    const { checkoutPage } = this.world.pm;
    await expect(checkoutPage.confirmationMessage).toBeVisible();
  }

  async proceedToBillingCheckout() {
    const { cartPage } = this.world.pm;
    await cartPage.proceedToCheckout(2);
  }
}
