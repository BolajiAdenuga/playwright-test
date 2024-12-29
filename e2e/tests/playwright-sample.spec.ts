/*
    *** Sample test: Navigate to Playwright page and perform a search with basic verifications *** 
*/

import { test, expect, chromium, Page } from '@playwright/test';
import { Homepage } from '../page-objects/homepage.po';
import { Constants } from '../constants';
import { ScreenshotUtils } from '../utils/screenshot.utils';
import { Common } from '../page-objects/common.po';
import { Result } from '../page-objects/result.po';

require('dotenv').config();

test.describe.configure({ mode: 'serial' });

const PLAYWRIGHT_URL = process.env.PLAYWRIGHT_URL ?? '';
const USERNAME = process.env.USERNAME  ?? '';
const PASSWORD = process.env.PASSWORD ?? '';
let page: Page;

test.beforeAll(async ({}) =>  {
  const browser = await chromium.launch({args: ['--ignore-certificate-errors', '--no-sandbox',  '--disable-gpu']});
  page = await browser.newPage();
});

test.afterAll(async ({browser}) =>  {
  await browser.close();
});

test('Navigate to Playwright and perform some search in API documentation', async ({ }) =>
{
  await test.step("Step 1 - Navigate to Playwright url and verify we are in Homepage", async () => {
    await Homepage.navigateTo(page);
    await expect(page).toHaveURL(PLAYWRIGHT_URL);
    await expect(Homepage.getTitle(page)).toHaveText(Constants.HOMEPAGE_TITLE);
    expect(Homepage.getStartButton(page).isVisible()).toBeTruthy();
    await Homepage.getStartButton(page).click();
    await expect(page).toHaveURL('https://playwright.dev/docs/intro');

    let expectedMenuOptions = (["Docs", "API", "Node.js", "Community"]);
    expect(await Common.getTopMenu(page).getMenuOptions()).toStrictEqual(expectedMenuOptions);

    await ScreenshotUtils.takeScreenshot(page, 'Playwright Test Example', 'Step1_Playwright_Homepage');
  });

  await test.step("Step 2 - Navigate to API menu option", async () => {
    await Common.getTopMenu(page).selectTopMenuOption('API');
    await expect(page).toHaveURL('https://playwright.dev/docs/api/class-playwright');

    await ScreenshotUtils.takeScreenshot(page, 'Playwright Test Example', 'Step2_Playwright_API');

  });

  await test.step("Step 3 - Select documentation through Left Menu", async () => {
    await Common.getLeftMenu(page).selectLeftMenuOption('PageAssertions');
    await expect(page).toHaveURL('https://playwright.dev/docs/api/class-pageassertions');
    
    await ScreenshotUtils.takeScreenshot(page, 'Playwright Test Example', 'Step3_Playwright_PageAssertions');
  });

  await test.step("Step 4 - Search for documentation through Search option", async () => {
    // Search for locator
    await Common.getTopMenu(page).selectSearch();
    await Common.getSearchModal(page).searchFor('locator');    
    
    // Verify each result contains searched word
    let allResults = await Common.getResultsPanelList(page).getResultsList();
    for(let i = 0; i < allResults.length; i++)
    {
      expect(allResults[i]?.toLocaleLowerCase()).toContain('locator');
    }

    // Select result
    await Common.getResultsPanelList(page).selectResult('Other locators')
    await expect(Result.getTitle(page)).toHaveText('Other locators');

    await ScreenshotUtils.takeScreenshot(page, 'Playwright Test Example', 'Step4_Playwright_OtherLocators')
  });
});






