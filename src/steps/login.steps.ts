import { Given, When, Then } from "@cucumber/cucumber";
import type { CustomWorld } from "../support/world.js";

Given("I open the login page", async function (this: CustomWorld) {
  await this.loginSteps.openLoginPage();
});

When('I enter username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  await this.loginSteps.login(username, password);

});

Then("I should see my account page", async function (this: CustomWorld) {
  await this.loginSteps.shouldBeLoggedIn();
});

Then(
  "I should see a login error message",
  async function (this: CustomWorld) {
    await this.loginSteps.shouldSeeLoginError();
  });





