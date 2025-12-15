import type { Page, Locator } from "playwright";
import { BasePage } from "./BasePage.js";

export class OrdersPage extends BasePage {
  readonly ordersTableRows: Locator;
  readonly orderDateCells: Locator;
  readonly orderTotalCells: Locator;
  readonly orderSummaryCells: Locator;
  readonly orderDetailLinks: Locator;

  readonly orderDetailModal: Locator;
  readonly orderDetailItems: Locator;

  constructor(page: Page) {
    super(page);
    this.ordersTableRows = page.locator('tr[class="ng-star-inserted"]');
    this.orderDateCells = page.locator('[data-test="order-date"]');
    this.orderTotalCells = page.locator('[data-test="order-total"]');
    this.orderSummaryCells = page.locator('[data-test="order-summary"]');
    this.orderDetailLinks = page.locator('[data-test="order-details-link"]');

    this.orderDetailModal = page.locator('[data-test="order-detail-modal"]');
    this.orderDetailItems = page.locator('[data-test="order-detail-item"]');
  }

  async gotoOrders() {
    await this.goto("/#/account/orders");
  }

  async openFirstOrderDetails() { //clicks on the first order's details link
    await this.orderDetailLinks.first().click();
  }
}
