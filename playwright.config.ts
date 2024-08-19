import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
//dotenv.config({ path: path.resolve(__dirname, '.env') });


if (!process.env.NODE_ENV) {
  require('dotenv').config({ path: `${__dirname}/src/config/.env` });
}
else {
  require('dotenv').config({ path: `${__dirname}/src/config/.env.${process.env.NODE_ENV}` });
}
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: './global-setup',
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Timeout for each step in milliseconds */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,

  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 10,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://login.salesforce.com/',

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',

    /* Login authentication */
    storageState: './LoginAuth.json'
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'setup',
    //   testDir: './',
    //   testMatch: 'global-setup.ts',
    // },
    {
      name: 'chromium',
      //dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: './LoginAuth.json' },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
