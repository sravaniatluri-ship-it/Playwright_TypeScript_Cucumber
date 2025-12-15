import { When, Then } from "@cucumber/cucumber";
import type { CustomWorld } from "../support/world.js";

When(
  "I proceed to checkout from the cart",
  async function (this: CustomWorld) {
    await this.checkoutSteps.proceedToCheckout();
  });

When(
  "I proceed to  billing Address After sign",
  async function (this: CustomWorld) {
    await this.checkoutSteps.proceedToBillingCheckout();
  });

When('I proceed with Billing Details {string}, {string}, {string}, {string} and {string} to payment', async function (this: CustomWorld, streetname: string, city: string, state: string, country: string, postcode: string) {
  await this.checkoutSteps.completeCheckoutWithValidData(streetname, city, state, country, postcode);
});
When("I complete payment with valid details", async function (this: CustomWorld) {
  await this.checkoutSteps.completePaymentWithValidDetails();
});

When("I should see an Payment confirmation", async function (this: CustomWorld) {
  await this.checkoutSteps.shouldSeePaymentConfirmation();
});

Then("I should see an order confirmation", async function (this: CustomWorld) {
  await this.checkoutSteps.shouldSeeOrderConfirmation();
});


