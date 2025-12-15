import { Before, After, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { CustomWorld } from "../support/world.js";
import { newApiContext } from "../api/apiClient.js";
import fs from "fs";
import path from "path";

setDefaultTimeout(60 * 5 * 1000);
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const safeName = (name: string) =>
  name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").slice(0, 150);

// ✅ API hook: runs only for @api scenarios
Before({ tags: "@api" }, async function (this: CustomWorld) {
  this.api = await newApiContext();
  this.initApi(); // ✅ API steps only
  // Don't start browser
});

// ✅ UI hook: runs for everything except @api
Before({ tags: "not @api" }, async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(12000);
  this.page.setDefaultNavigationTimeout(20000);

  this.init();  // Initialize PageManager + Step classes
});
// ✅ After hook: dispose depending on what was created
After({ tags: "not @api" }, async function (this: CustomWorld, scenario) {

  // ✅ screenshot for BOTH PASS and FAIL
  const shotsDir = path.join(process.cwd(), "reports", "screenshots");
  ensureDir(shotsDir);

  const status = scenario.result?.status ?? Status.UNKNOWN;
  const scenarioName = safeName(scenario.pickle.name);
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${scenarioName}__${status}__${ts}.png`;
  const filePath = path.join(shotsDir, fileName);

  const buffer = await this.page.screenshot({ path: filePath, fullPage: true });

  // ✅ attach so it appears in HTML report
  await this.attach(buffer, "image/png");
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});

After({ tags: "@api" }, async function (this: CustomWorld) {
  await this.api?.dispose();
});