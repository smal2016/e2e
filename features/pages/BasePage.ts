import { Browser, Page } from "puppeteer";
import { options, urls } from "../support/data";
import { Base } from "./Base";
import { errorMessages as errors } from "../support/errorMessages"

const { timeouts } = options

class BasePage extends Base {
  constructor (public page: Page | null) {
    super();
  }

  public async open(
    browser: Browser,
    pageUrl: string,
    timeout: number = timeouts.normal
  ): Promise<void> {
    this.page = await browser.newPage();
    const url = `${urls.baseUrl}/${pageUrl}`;
    try {
      await this.page.goto(url, { timeout });
    } catch(err){
      throw new Error(errors.waitingForPageLoad(url, timeout))
    }
  }
}

export { BasePage };
