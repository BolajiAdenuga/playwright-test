import { Locator } from "@playwright/test";

export class SearchModal
{
    constructor(private parent: Locator)
    {
    }

    public async searchFor(query: string): Promise<void> 
    {
        return await this.parent.locator('input.DocSearch-Input').fill(query, {timeout:3000});
    }
}