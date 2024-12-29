import { Button } from '../widget-objects/button.wo';
import { Input } from '../widget-objects/input.wo';
import { Page } from '@playwright/test';

const URL: string = process.env.PLAYWRIGHT_URL ?? '';

export class LoginPage 
{
  static async navigateTo(page: Page): Promise<void> 
  {
    await page.goto(URL);
  }

  static getEmailField(page: Page): Input
  {
    return new Input(page.locator('input[type="email"]'));
  }

  static getPasswrdField(page: Page): Input
  {
    return new Input(page.locator('input[type="password"]'));
  }

  static getSubmitButton(page: Page): Button
  {
    return new Button(page.locator('input[type="submit"]'));
  }

  static getConfirmationButton(page: Page): Button
  {
    return new Button(page.getByRole('button', { name: 'Yes' }));
  }
}
