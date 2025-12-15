import { Given, When, Then } from "@cucumber/cucumber";
import type { CustomWorld } from "../../support/world.js";

Given("I have an API client", async function (this: CustomWorld) {
  await this.brandsApiSteps.ensureApiClient();
});

When("I request the list of brands", async function (this: CustomWorld) {
  await this.brandsApiSteps.getBrands();
});

When('I create a brand with name {string}', async function (this: CustomWorld, name: string) {
  await this.brandsApiSteps.createBrand(name);
});

Then("the response status should be {int}", async function (this: CustomWorld, code: number) {
  await this.brandsApiSteps.assertStatus(code);
});

Then("the response should contain at least 1 brand", async function (this: CustomWorld) {
  await this.brandsApiSteps.assertAtLeastOneBrand();
});

Then('the created brand name should contain {string}', async function (this: CustomWorld, expected: string) {
  await this.brandsApiSteps.assertCreatedBrandNameContains(expected);
});
