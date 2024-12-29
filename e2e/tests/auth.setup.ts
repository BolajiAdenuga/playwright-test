/*
    *** Setup file: auth.setup.ts ***
    ** This file contains Microsoft login script.
    ** It is the setup to be executed first to save session data into .auth/user.json file
    ** The rest of the tests will use the configuration stored in that file to avoid repeating the login for each Test Case.
    ** Configuration is in playwright.config.ts in projects section
*/

import { test as setup } from '@playwright/test';
import { chromium, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/ms-login.po';
import { ScreenshotUtils } from '../utils/screenshot.utils';
require('dotenv').config();

const authFile = '.auth/user.json';
const USERNAME = process.env.USERNAME  ?? '';
const PASSWORD = process.env.PASSWORD ?? '';

setup('Application Authentication', async ({}) => 
{
    const browser = await chromium.launch({args: ['--ignore-certificate-errors', '--no-sandbox',  '--disable-gpu']});
    const page = await browser.newPage();

    await setup.step('Microsoft login script', async () => 
    {
        try 
        {
            await LoginPage.navigateTo(page);
            await LoginPage.getEmailField(page).write(USERNAME);
            await LoginPage.getSubmitButton(page).click();
            await LoginPage.getPasswrdField(page).write(PASSWORD);
            await LoginPage.getSubmitButton(page).click();
            await expect(page).toHaveURL('');
            
            console.log('Login: ' + page.url());
    
            // Playwright feature to save storage state (.gitignore'd)
            await page.context().storageState({ path: authFile });

            await ScreenshotUtils.takeScreenshot(page, 'Authentication', '1-Logged into the application');
        } catch (error) {
            console.error('Error:', error);
            await browser.close();
        } finally {
            await browser.close();
        }
    });
});
