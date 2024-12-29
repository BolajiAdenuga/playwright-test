import { Page, Locator } from '@playwright/test';

export class Result
{
  static getTitle(page: Page): Locator
  {
    return page.locator('h1');
  }
}
