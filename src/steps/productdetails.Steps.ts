import { Given, When, Then } from "@cucumber/cucumber";
import type { CustomWorld } from "../support/world.js";

When("The quantity should be greater than {int}", async function (this: CustomWorld, qty: number) {
    await this.productDetailsSteps.shouldSeeQuantity(qty);
});

When("I increase quantity", async function (this: CustomWorld) {
    await this.productDetailsSteps.increaseQuantityBy1();
});

When("decrease quantity", async function (this: CustomWorld) {
    await this.productDetailsSteps.decreaseQuantityBy1();
});