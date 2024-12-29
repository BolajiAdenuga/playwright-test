import { Locator } from "playwright";

export class Input {

    constructor(private parent: Locator)
    {
    }

    public async isVisible(): Promise<boolean>
    {
        return await this.parent.isVisible();
    }

    public async write(text: string): Promise<void>
    {
        return await this.parent.fill(text);
    }

    public async getText(): Promise<string>
    {
        return await this.parent.innerText();
    }

    public async getPlaceholderText(): Promise<string | null>
    {
        return await this.parent.getAttribute('placeholder', {timeout: 3000});
    }

    public async getValue(): Promise<string | null>
    {
        return await this.parent.getAttribute('value', {timeout: 3000});
    }
}
