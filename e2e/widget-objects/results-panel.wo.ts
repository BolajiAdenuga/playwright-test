import { Locator, expect } from "@playwright/test";

export class ResultsPanel
{
    constructor(private parent: Locator)
    {
    }

    public async getResultsList(): Promise<string[]>
    {
        return await this.parent.locator('li .DocSearch-Hit-content-wrapper span.DocSearch-Hit-title').allInnerTexts();
    }

    public async selectResult(result: string): Promise<void> 
    {
        return await this.parent.locator('span.DocSearch-Hit-title').filter({ hasText: result}).click();
    }
}