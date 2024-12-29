import { Locator, expect } from "@playwright/test";

export class TopMenu
{
    constructor(private parent: Locator)
    {
    }

    public async selectTopMenuOption(option: string): Promise<void> 
    {
        return await this.parent.locator('.navbar__link').filter({ hasText: option}).click();
    }

    public async getMenuOptions(): Promise<string[]>
    {
        await expect(this.parent).toBeVisible();
        return await this.parent.locator('.navbar__items:nth-child(1) .navbar__item').allInnerTexts();
    }

    public async selectSearch(): Promise<void>
    {
        return await this.parent.locator('.DocSearch-Search-Icon').click();
    }
}