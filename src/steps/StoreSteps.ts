import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

export class StoreSteps {
  constructor(private world: CustomWorld) { }

  async openShop() {
    await this.world.pm.shopPage.gotoShop();
  }
  async navigateToHomePage() {
    try{
      await this.world.pm.shopPage.gotoHomePage(); 
       await expect(this.world.pm.shopPage.productCards.first()).toBeVisible();
    }
    catch(error){
      throw new Error("Failed to Navigate to Home page : " + error)

    }
   
  }

  async productsShouldBeVisible() {
    const { shopPage } = this.world.pm;
    await expect(shopPage.productCards.first()).toBeVisible();
    await expect(shopPage.productNames.first()).toBeVisible();
    await expect(shopPage.productPrices.first()).toBeVisible();
    await expect(shopPage.productImages.first()).toBeVisible();
  }
  async canOpenFirstProductDetails() {
    const { shopPage, productDetailsPage } = this.world.pm;
    await shopPage.openFirstProduct();
    await expect(productDetailsPage.name).toBeVisible();
    await expect(productDetailsPage.unitPrice).toBeVisible();
    await expect(productDetailsPage.image1).toBeVisible();
    await expect(productDetailsPage.addToCartButton).toBeEnabled();
  }
  async searchForExistingProduct(name: string) {
    const { shopPage } = this.world.pm;
    await shopPage.searchFor(name);
    await expect(shopPage.productNames).toContainText(name);
  }
  async searchForNonExistingProduct(term: string) {
    const { shopPage } = this.world.pm;
    await shopPage.searchFor(term);
  }
  // product not found
  async ProductNotFound() {
    const { shopPage } = this.world.pm;
    await expect(shopPage.noResultsMessage).toBeVisible();
    await expect(shopPage.noResultsMessage).toHaveText('There are no products found.');
  }
  async addFirstProductToCartFromDetails() {
    const { shopPage, productDetailsPage, header } = this.world.pm;

    await shopPage.openFirstProduct();
    await productDetailsPage.addToCart();
    await expect(header.cartCount).toHaveText("1");
  }
}
