import type { Page, Locator } from "playwright";
import { BasePage } from "./BasePage.js";
import { CONSTANT_WAIT } from  "../helper/Timeout.js";  

export class CheckoutPage extends BasePage {
  readonly billingStreetname: Locator;
  readonly billingCity: Locator;
  readonly billingState: Locator;
  readonly billingPostcode: Locator;
  readonly billingCountry: Locator;

  readonly paymentCardNumber: Locator;
  readonly paymentExpiry: Locator;
  readonly paymentCvv: Locator;

  readonly placeOrderButton: Locator;
  readonly confirm: Locator
  readonly confirmationMessage: Locator;
  readonly orderConfirmation: Locator;
  readonly paymentmethod: Locator;

  constructor(page: Page) {
    super(page);

    this.billingStreetname = page.locator(('[data-test="street"]'));
    this.billingCity = page.locator(('[data-test="city"]'));
    this.billingState = page.locator('[data-test="state"]');
    this.billingCountry = page.locator('[data-test="country"]');
    this.billingPostcode = page.locator('[data-test="postal_code"]');

    this.paymentmethod = page.locator('[data-test="payment-method"]');
    this.paymentCardNumber = page.locator('[data-test="payment-card-number"]');
    this.paymentExpiry = page.locator('[data-test="payment-expiry"]');
    this.paymentCvv = page.locator('[data-test="payment-cvv"]');
    this.confirm = page.locator('[data-test="finish"]');
    this.placeOrderButton = page.locator('[data-test="place-order"]');
    this.confirmationMessage = page.locator('[data-test="payment-success-message"]');
    this.orderConfirmation = page.getByText('Thanks for your order! Your');
  }

  async fillValidbillingDetails(streetname: string, city: string, state: string, country: string, postcode: string) {
    await this.delay(CONSTANT_WAIT.MEDIUM);
    await this.waitForPageLoad("networkidle");
    await this.waitForPageLoad("load");
    await this.clearAndFill(this.billingStreetname, streetname);
    await this.clearAndFill(this.billingCity, city);
    await this.clearAndFill(this.billingState, state);
    await this.clearAndFill(this.billingCountry, country);
    await this.clearAndFill(this.billingPostcode, postcode);
    //await this.delay(300000); // Wait for 2 minutes
  }

  async fillValidPaymentDetails() {
    await this.paymentmethod.selectOption("cash-on-delivery");
    //await this.paymentCardNumber.fill("7843 2390 2394 2394");
    //await this.paymentExpiry.fill("10/30");
    //await this.paymentCvv.fill("163");

  }

  async confirmOrder() {
     await this.confirm.click();
    
  }
  async orderConfirmationMessage(): Promise<string> {
    return this.orderConfirmation.innerText();
  }
  
}
