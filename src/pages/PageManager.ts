import type { Page } from "playwright";
import { LoginPage } from "./LoginPage.js";
import { ShopPage } from "./ShopPage.js";
import { ProductDetailsPage } from "./ProductDetailsPage.js";
import { CartPage } from "./CartPage.js";
import { CheckoutPage } from "./CheckoutPage.js";
import { OrdersPage } from "./OrdersPage.js";
import { Header } from "./Header.js";

export class PageManager {
  readonly page: Page;

  readonly loginPage: LoginPage;
  readonly shopPage: ShopPage;
  readonly productDetailsPage: ProductDetailsPage;
  readonly cartPage: CartPage;
  readonly checkoutPage: CheckoutPage;
  readonly ordersPage: OrdersPage;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;

    this.loginPage = new LoginPage(page);
    this.shopPage = new ShopPage(page);
    this.productDetailsPage = new ProductDetailsPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.ordersPage = new OrdersPage(page);
    this.header = new Header(page);
    
  }

  gotoLoginPage(): LoginPage {
    return this.loginPage;
  }
}
