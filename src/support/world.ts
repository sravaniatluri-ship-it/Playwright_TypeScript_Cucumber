// src/support/world.ts
import { setWorldConstructor, World as CucumberWorld } from "@cucumber/cucumber";
import type { APIRequestContext, Browser, BrowserContext, Page } from "playwright";
import { BrandsApiSteps } from "../steps/api/BrandsApiSteps.js";
import { PageManager } from "../pages/PageManager.js";
import { LoginSteps } from "../steps/LoginSteps.js";
import { StoreSteps } from "../steps/StoreSteps.js";
import { CartSteps } from "../steps/CartSteps.js";
import { CheckoutSteps } from "../steps/CheckoutSteps.js";
import { ProductDetailsSteps } from "../steps/ProductDetailsSteps.js";

export class CustomWorld extends CucumberWorld {
  // Playwright objects
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  // Page objects / helpers
  pm!: PageManager;

  // ✅ API context used by API tests
  api?: APIRequestContext;

  // ✅ Step service
  brandsApiSteps!: BrandsApiSteps;

  // Step “service” classes
  loginSteps!: LoginSteps;
  storeSteps!: StoreSteps;
  cartSteps!: CartSteps;
  checkoutSteps!: CheckoutSteps;
  productDetailsSteps!: ProductDetailsSteps;
  /**
   * Called from hooks.ts *after* page/context have been created.
   * This wires up the PageManager and all step helper classes.
   */
  init() {
    this.pm = new PageManager(this.page);
    this.brandsApiSteps = new BrandsApiSteps(this);
    this.loginSteps = new LoginSteps(this);
    this.storeSteps = new StoreSteps(this);
    this.cartSteps = new CartSteps(this);
    this.checkoutSteps = new CheckoutSteps(this);
    this.productDetailsSteps = new ProductDetailsSteps(this);
  }
  /**
   * API initialization (NO browser)
   */
  initApi() {
    if (!this.api) {
      throw new Error("API init called without APIRequestContext");
    }
    this.brandsApiSteps = new BrandsApiSteps(this);
  }
}
setWorldConstructor(CustomWorld);
