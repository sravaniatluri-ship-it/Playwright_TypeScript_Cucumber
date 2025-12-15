import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

export class ProductDetailsSteps {
  constructor(private world: CustomWorld) { }

  async viewQuantityNum() {
    await this.world.pm.productDetailsPage.viewQuantity();
  }
  async shouldSeeQuantity(value: number) {
    const qty = await this.world.pm.productDetailsPage.getQuantity();
    console.log("Quantity: " , qty);
    expect(qty).toBeGreaterThan(value);
  }
  async increaseQuantityBy1(value: number = 1) {
    await this.world.pm.productDetailsPage.increaseOnce();
  }
  async decreaseQuantityBy1() {
    await this.world.pm.productDetailsPage.decreaseOnce();
  }
}