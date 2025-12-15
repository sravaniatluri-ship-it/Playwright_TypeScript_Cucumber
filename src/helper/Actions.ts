import { type Locator, type Page } from "@playwright/test";
type PageLoadState = "load" | "domcontentloaded" | "networkidle";


export class Actions {
    readonly page: Page;
    private readonly defaultTimeout = 5000;

    constructor(page: Page) {
        this.page = page;
    }

    // -------------------------
    // Navigation
    // -------------------------
    async navigateToUrl(
        url: string,
        timeout: number = this.defaultTimeout,
        waitUntil: PageLoadState
    ): Promise<void> {
        try {
            console.log(`Navigating to URL: ${url}`);
            await this.page.goto(url, { timeout, waitUntil });
        } catch (error) {
            console.error(`Failed to navigate to URL: ${url}`, error);
            throw error;
        }
    }

    async waitForPageLoad(
        state: PageLoadState,
        timeout: number = this.defaultTimeout
    ): Promise<void> {
        try {
            await this.page.waitForLoadState(state, { timeout });
        } catch (error) {
            console.error(`Page did not reach load state: ${state}`, error);
            throw error;
        }
    }
    //click method
    async click(
        locator: Locator,
        timeout: number = this.defaultTimeout
    ): Promise<void> {
        try {
            await locator.waitFor({ state: "visible", timeout });
            await locator.click({ timeout });
        } catch (error) {
            console.error("Click action failed", error);
            throw error;
        }
    }
    //Fill method
    async fill(
        locator: Locator,
        text: string,
        timeout: number = this.defaultTimeout
    ): Promise<void> {
        try {
            await locator.waitFor({ state: "visible", timeout });
            await locator.fill(text, { timeout });
        } catch (error) {
            console.error(`Failed to fill text: ${text}`, error);
            throw error;
        }
    }
    //clearAndFill method
    async clearAndFill(
        locator: Locator,
        text: string,
        timeout: number = this.defaultTimeout
    ): Promise<void> {
        try {
            await locator.waitFor({ state: "visible", timeout });
            await locator.clear({ timeout });
            await locator.fill(text, { timeout });
        } catch (error) {
            console.error(`Failed to clear and fill text: ${text}`, error);
            throw error;
        }
    }
    
    async waitForVisible(
        locator: Locator,
        timeout: number = this.defaultTimeout
    ): Promise<void> {
        try {
            await locator.waitFor({ state: "visible", timeout });
        } catch (error) {
            console.error("Element not visible", error);
            throw error;
        }
    }

    async delay(
        waitTime: number = this.defaultTimeout
    ): Promise<void> {
        try {
            console.log(`Constant wait for ${waitTime} ms`);
            await this.page.waitForTimeout(waitTime);
        } catch (error) {
            console.error("Constant wait failed", error);
            throw error;
        }
    }

}
