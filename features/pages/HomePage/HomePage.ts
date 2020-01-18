import { Browser, Page } from 'puppeteer';
import { BasePage } from "../BasePage/BasePage";
import { PageObject } from "../types";

class HomePage extends BasePage implements PageObject {
    public pageTitle = '[class*="headline"]'

    constructor (public page: Page = null) {
      super(page);
    }

    get url (): string {
      return '';
    }

    public open (browser: Browser): Promise<void> {
      return super.open(browser, this.url);
    }

    public isPageOpened (): Promise<boolean> {
      return this.isSelectorPresent(this.page, this.pageTitle);
    }
}

export { HomePage };
