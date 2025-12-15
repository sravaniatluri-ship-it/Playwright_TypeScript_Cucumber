import type { Page } from "playwright";
import { getEnvConfig } from "../config/env.config.js";
import { Actions } from "../helper/Actions.js";
//import { getEnvConfig } from "../config/env.config.js"; 
export class BasePage extends Actions{
  public page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  protected buildUrl(path: string = "/") {
    const { baseUrl } = getEnvConfig();
    console.log(`Base URL: ${baseUrl}, Path: ${path}`);
    return `${baseUrl}${path}`;
  }

  async goto(path: string = "/") {
    await this.page.goto(this.buildUrl(path));
  }
}
