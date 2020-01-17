import { Browser, Page } from 'puppeteer'
import { BasePage } from "../base/BasePage"

class HomePage extends BasePage {
    public pageTitle = '[class*="headline"]'

    constructor (public page: Page = null) {
      super(page)
    }

    get url (): string {
      return ''
    }

    public open (browser: Browser): Promise<void> {
      return super.open(browser, this.url)
    }

    public isPageOpened (): Promise<boolean> {
      return this.isSelectorPresent(this.page, this.pageTitle)
    }
}

export { HomePage }
