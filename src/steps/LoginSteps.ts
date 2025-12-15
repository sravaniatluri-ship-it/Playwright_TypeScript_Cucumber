import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

export class LoginSteps {
  constructor(private world: CustomWorld) { }

  async openLoginPage() {
    await this.world.pm.loginPage.goto();
  }

  async login(username: string, password: string) {
    await this.world.pm.loginPage.login(username, password);
  }
  async shouldBeLoggedIn() {
    const ok = await this.world.pm.loginPage.isLoginSuccessful();
    expect(ok).toBeTruthy();
  }
  async shouldSeeLoginError() {
    await expect(this.world.pm.loginPage.errorAlert).toBeVisible();
    await expect(this.world.pm.loginPage.errorAlert).toHaveText("Invalid email or password");
  }
}

