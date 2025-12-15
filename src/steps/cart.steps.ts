import { Given, When, Then } from "@cucumber/cucumber";
import type { CustomWorld } from "../support/world.js";

When("I open the cart", async function (this: CustomWorld) {//open cart
  await this.cartSteps.openCart();
});

Then("The cart shows the product with name, quantity and price", async function (this: CustomWorld) {
  await this.cartSteps.cartShouldContainAtLeastOneItem();
});

When("I delete the product from the cart", async function (this: CustomWorld) {
  await this.cartSteps.deleteSelected();

}); 
Then("The cart is empty", async function (this: CustomWorld) {
  await this.cartSteps.cartShouldBeEmpty();

});
Then("The system should display {string}", async function (this: CustomWorld, message: string) {
  await this.cartSteps.getEmptyCartMessage("The cart is empty. Nothing to display.");
});
 
  

