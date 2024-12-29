import { Locator, expect } from "@playwright/test";

export class Button
{
    constructor(private parent: Locator)
    {
    }

    public async isVisible(): Promise<boolean> 
    {
        await expect(this.parent).toBeVisible();
        return await this.parent.isVisible();
    }

    public async getText(): Promise<string>
    {
        return await this.parent.innerText();
    }

    public async click(): Promise<void>
    {
        await expect(this.parent).toBeEnabled();
        return await this.parent.click();
    }
}