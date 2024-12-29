import { Page, Locator } from '@playwright/test';
import { Button } from '../widget-objects/button.wo';

const PLAYWRIGHT_URL: string = process.env.PLAYWRIGHT_URL ?? '';

export class Homepage
{
  static async navigateTo(page: Page): Promise<void> 
  {
    console.log('Navigating to: ' + PLAYWRIGHT_URL);
    await page.goto(PLAYWRIGHT_URL, {timeout:5000});
  }

  static getTitle(page: Page): Locator
  {
    return page.locator('h1');
  }

  static getStartButton(page: Page): Button
  {
    return new Button(page.getByText('Get started'));
  }
}
