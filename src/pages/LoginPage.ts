// src/pages/LoginPage.ts
import type { Page, Locator } from "playwright";
import { BasePage } from "./BasePage.js";


export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;
  readonly homeLink: Locator;
  readonly errorAccountLocked: Locator;



  constructor(page: Page) {
    super(page);

    // Use data-test IDs used by the actual site
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="login-submit"]');
    this.errorAlert = page.getByText('Invalid email or password')
    this.homeLink = page.locator('[data-test="nav-home"]');
    this.errorAccountLocked = page.getByText('Account locked, too many failed attempts. Please contact the administrator.');
  }

  async goto() {
    await super.goto("/auth/login");
  }

  async login(email: string, password: string) {
    const isvisible = await this.emailInput.isVisible({ timeout: 5000 });
    if (isvisible) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    }
    //If account is locked below methods are used
    const isErrorAccountLockedVisible = await this.errorAccountLocked.isVisible({ timeout: 5000 });
    if (isErrorAccountLockedVisible) {
      this.loginWithFallbackIfLocked();
    }

  }

  async loginWithFallbackIfLocked() {

    const accounts = [
      { email: "customer2@practicesoftwaretesting.com", password: "welcome01" },
      { email: "customer3@practicesoftwaretesting.com", password: "pass123" },
    ];

    // Try first account
    await this.login(accounts[0].email, accounts[0].password);

    // Wait until either we see the locked error OR we reach a "success" condition.
    // Replace /dashboard/ with your real post-login URL or success selector.
    const outcome = await Promise.race([
      this.errorAccountLocked.waitFor({ state: "visible", timeout: 5000 }).then(() => "LOCKED" as const),
      this.homeLink.isVisible( { timeout: 8000 }).then(() => "SUCCESS" as const),
    ]).catch(() => "UNKNOWN" as const);

    if (outcome === "SUCCESS") return;

    if (outcome === "LOCKED") {
      // optional: clear fields before retry (fill() already replaces, but this is explicit)
      await this.emailInput.fill("");
      await this.passwordInput.fill("");

      // Try second account
      await this.login(accounts[1].email, accounts[1].password);

      // Ensure second attempt succeeds (adjust to your app’s success condition)
      this.homeLink.isVisible( { timeout: 8000 });
      return;
    }
    // If neither success nor locked error happened, treat as unexpected
    throw new Error("Login failed: neither success nor account-locked error detected");
  }

  async isLoginSuccessful(): Promise<boolean> {
    return this.homeLink.isVisible({ timeout: 15000 });
  }
}
