import { request, type APIRequestContext } from "playwright";
import { getEnvConfig } from "../config/env.config.js"; // uses TEST_ENV mapping :contentReference[oaicite:1]{index=1}

export async function newApiContext(): Promise<APIRequestContext> {
  const { apiBaseUrl } = getEnvConfig();

  return request.newContext({
    baseURL: apiBaseUrl,
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function newAuthedApiContext(token: string): Promise<APIRequestContext> {
  const { apiBaseUrl } = getEnvConfig();

  return request.newContext({
    baseURL: apiBaseUrl,
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
