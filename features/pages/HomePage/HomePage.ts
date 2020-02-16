import { Browser, Page } from 'puppeteer';
import { BasePage } from "../BasePage/BasePage";
import { PageObject } from "../types";

class HomePage extends BasePage implements PageObject {
    public input = '[action="/search"] style ~ input'
    public searchResults = '#search'
    public submit = 'input[type="submit"]'

    constructor (public page: Page = null) {
      super(page);
    }

    get url (): string {
      return '';
    }

    public open (browser: Browser): Promise<void> {
      return super.open(browser, this.url);
    }

    fillSearch(value: string): Promise<string>{
      return this.fillField(this.page, this.input, value);
    }
    submitForm(): Promise<void>{
      return this.clickOn(this.submit, this.page);
    }

    public isPageOpened (): Promise<boolean> {
      return this.isSelectorPresent(this.page, this.input);
    }

    async getResultsText(): Promise<string>{
      await this.waitForSelector(this.page, this.searchResults);
      const element = await this.page.$(this.searchResults);
      return this.getElementText(element);
    }
}

export { HomePage };
