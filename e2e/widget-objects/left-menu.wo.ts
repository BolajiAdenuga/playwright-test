import { Locator } from "@playwright/test";

export class LeftMenu
{
    constructor(private parent: Locator)
    {
    }

    public async selectLeftMenuOption(option: string): Promise<void> 
    {
        return await this.parent.locator('li.theme-doc-sidebar-item-link').filter({ hasText: option}).click();
    }
}