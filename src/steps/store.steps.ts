import { Given, When, Then } from "@cucumber/cucumber";
import type { CustomWorld } from "../support/world.js";
import { ShopPage } from "../pages/ShopPage.js";

Given("I am on the shop page", async function (this: CustomWorld) {
  await this.storeSteps.openShop();
});

Then("I see a list of products with names, images and prices", async function (this: CustomWorld) {
  await this.storeSteps.productsShouldBeVisible();
});

When("I open the first product details", async function (this: CustomWorld) {
  await this.storeSteps.canOpenFirstProductDetails();
});

When(
  "I search for a product named {string}",
  async function (this: CustomWorld, name: string) {
    await this.storeSteps.searchForExistingProduct(name);
  });

// New steps for non-existing product search
When(
  "I search for a non-existent product item {string}",
  async function (this: CustomWorld, term: string) {
    await this.storeSteps.searchForNonExistingProduct(term);
  });
// New step for no results assertion
Then("I should see a no products found message is displayed",
  async function (this: CustomWorld) {
    await this.storeSteps.ProductNotFound()
  });

When('I navigative to Home page', async function (this: CustomWorld) {
  await this.storeSteps.navigateToHomePage();
});

Then('The Home page should be displayed', async function (this: CustomWorld) {
  await this.storeSteps.productsShouldBeVisible();
});

When(
  "I add the first product to the cart from its details page",
  async function (this: CustomWorld) {
    await this.storeSteps.addFirstProductToCartFromDetails();
});
