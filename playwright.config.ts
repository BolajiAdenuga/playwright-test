import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e/tests',
  timeout: 40 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 
  [
      ['html', { open: 'never' }],
      ['./e2e/reporter/custom-reporter.ts'],
      ['junit', { outputFile: './e2e/integrations/jira/jira-results.xml' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    ignoreHTTPSErrors: true, 
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'on',
  },

  /* Configure projects for major browsers */
  projects: 
  [
    // Setup project
    // Uncomment if common login is needed
    // { 
    //    name: 'setup', 
    //    testMatch: /auth\.setup\.ts/,
    //    use:
    //    {
    //      ...devices['Desktop Edge'],
    //      launchOptions: 
    //      {
    //        args: ['--ignore-certificate-errors']
    //      } 
    //    }
    //  },
    // Test project that requires authentication
    // Uncomment if common loggin is needed
    // {
    //   name: 'Microsoft Edge',
    //   dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Edge'],
    //     // Use prepared auth state.
    //     storageState: '.auth/user.json',
    //     launchOptions: {
    //       args: ['--ignore-certificate-errors']
    //     } 
    //   },
    // },
    // Project that does not require authentication
    // Sample project using Playwright official page
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        launchOptions: {
          args: ['--ignore-certificate-errors']
        } 
      },
    },
  ],
});
