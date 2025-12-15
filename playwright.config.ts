import  {  defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // total test timeout (per test)
  use: {
    actionTimeout: 10000,        // timeout for actions (click, fill…)
    navigationTimeout: 15000,    // timeout for navigation
    headless: false,
    viewport: { width: 1280, height: 720 },
   // ignoreHTTPSErrors: true,
    video: 'on-first-retry'
  },
  expect: {
    timeout: 8000,               // timeout for assertions like expect(...).toBeVisible()
  },
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright-html' }]]
});