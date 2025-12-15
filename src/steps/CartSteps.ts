//Covers user stories 6 & 7
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

export class CartSteps {
  constructor(private world: CustomWorld) { }

  async openCart() {
    await this.world.pm.header.openCart();
  }

  async cartShouldContainAtLeastOneItem() {
    const { cartPage } = this.world.pm;
    await expect(cartPage.cartItems.first()).toBeVisible();
    await expect(cartPage.cartItemName.first()).toBeVisible();
    await expect(cartPage.cartItemQuantity.first()).toBeVisible();
    await expect(cartPage.cartItemPrice.first()).toBeVisible();
  }

  async deleteSelected() {
    const { cartPage } = this.world.pm;
    await cartPage.deleteSelectedItem();
  }
  async cartShouldBeEmpty() {
    const { cartPage } = this.world.pm;
    await expect(cartPage.cartItemNullState).toHaveCount(0);
  }
  async getEmptyCartMessage(p0: string) {
    const { cartPage } = this.world.pm;
    const message = await cartPage.getEmptyCartMessageText();
    expect(message).toContain("The cart is empty. Nothing to display.");
  }
}

