import { expect } from "@playwright/test";
import type { APIRequestContext, APIResponse } from "playwright";
import type { CustomWorld } from "../../support/world.js";

export class BrandsApiSteps {
  private api!: APIRequestContext;
  private response!: APIResponse;
  private responseBody: any = null;

  private createdBrandId: number | string | null = null;
  private createdBrandName: string | null = null;

  constructor(private world: CustomWorld) {}

  async ensureApiClient() {
    this.api = this.world.api!;
    expect(this.api).toBeTruthy();
  }

  async getBrands() {
    this.response = await this.api.get("/brands");
    this.responseBody = await this.safeJson(this.response);
  }

  async createBrand(prefix: string) {
    const name = `${prefix}-${Date.now()}`;
    this.response = await this.api.post("/brands", { data: {
  "name": name,
  "slug": name.toLowerCase().replace(/\s+/g, "-")
} });
    this.responseBody = await this.safeJson(this.response);
    console.log(`Created brand with ID: ${JSON.stringify(this.responseBody, null, 2)}`);


    this.createdBrandName = this.responseBody?.name ?? name;
    this.createdBrandId =
      this.responseBody?.id ??
      this.responseBody?.brandId ??
      this.responseBody?.data?.id ??
      null;
  }
  async assertStatus(code: number) {
    console.log(`Asserting response status is ${code}, actual: ${this.response.status()}`);
    expect(this.response.status()).toBe(code);
  }
  async assertAtLeastOneBrand() {
    // Some APIs return {data: []}, others return []
    const list = Array.isArray(this.responseBody)
      ? this.responseBody
      : this.responseBody?.data;

    expect(Array.isArray(list)).toBeTruthy();
    expect(list.length).toBeGreaterThan(0);
  }

  async assertCreatedBrandNameContains(expected: string) {//
    const name = this.responseBody?.name ?? this.createdBrandName ?? "";
    expect(name).toContain(expected);
  }

  // utility
  private async safeJson(res: APIResponse) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return text; // in case response is not JSON (e.g., 204)
    }
  }
}
