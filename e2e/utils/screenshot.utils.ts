/* Screenshots generation
*
** This file allows to take screenshots during test execution and save them into different folders divided by Test case
** ./screenshots/ folder is created during execution
*/

import { TestInfo, Page } from "@playwright/test";
var fs = require('fs');

export class ScreenshotUtils
{
    static async takeScreenshot( page: Page, testCase: string, screenshotName: string):  Promise<Buffer>
    {
       let dir = './screenshots/';
       
       if(!fs.existsSync(dir))
       {

            fs.mkdirSync(dir, { recursive: true });
            console.log('*** Creating directory: ' + dir);
            console.log('*** Full path: ' + dir + testCase + '/' + screenshotName + '.png')
            return await page.screenshot({ path: dir + testCase + '/' + screenshotName + '.png' });
       }
       else
       {
            console.log('*** Full path: ' + dir + testCase + '/' + screenshotName + '.png')
            return await page.screenshot({ path: dir + testCase + '/' + screenshotName + '.png' });
       }
    }   
}