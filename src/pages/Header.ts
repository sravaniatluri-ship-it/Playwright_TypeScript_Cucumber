import type { Page, Locator } from "playwright";
import { BasePage } from "./BasePage.js";

export class Header extends BasePage {
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly navCart: Locator;
  readonly cartCount: Locator;
  readonly userNameLabel: Locator;
 

  constructor(page: Page) {
    super(page);
    this.loginLink = page.getByText("Login");
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.navCart = page.locator('[data-test="nav-cart"]');
    this.cartCount = page.locator('[data-test="cart-quantity"]');
    this.userNameLabel = page.locator('[data-test="nav-user"]');
    
  }

  async openCart() {
    await this.navCart.click();
  }

}
