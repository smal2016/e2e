import { ElementHandle, JSHandle, Page, Response } from "puppeteer";
import { keys, options } from "../support/data";
import { errorMessages as errors } from "../support/errorMessages"

const { delays, timeouts } = options;

const RESPONSE = 'response'

class Base {
  public async clearDataAndType(page: Page, element: ElementHandle, value: string): Promise<void> {
    const lengthEl = (await this.getTextElement(element)).length;
    await element.focus();
    await page.keyboard.up(keys.CONTROL);
    await page.keyboard.press(keys.END, { delay: delays.press });
    for (let i = 0; i < lengthEl; i++) {
      await page.keyboard.press(keys.BACKSPACE, { delay: delays.press });
    }
    await element.type(value, { delay: delays.type });
  }

  public getTextElement(element: ElementHandle): Promise<string> {
    const context = element.executionContext();
    return context.evaluate((myEl: HTMLInputElement) => myEl.innerText || myEl.value, element);
  }

  async waitForSelector(page: Page, selector: string, timeout: number = timeouts.normal): Promise<void>{
    try {
      await page.waitForSelector(selector, { timeout })
    } catch(err){
      throw new Error(errors.waitingForSelector(selector, timeout))
    }
  }

  public async clickOn(selector: string, page: Page, timeout: number = timeouts.normal): Promise<void> {
    await this.waitForSelector(page, selector, timeout);
    await page.click(selector);
  }

  public async isSelectorPresent(page: Page, selector: string, timeout: number = timeouts.normal): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch (err) {
      return false;
    }
  }

  public async waitForClass(page: Page, selector: string, className: string): Promise<JSHandle> {
    await page.waitForSelector(selector);
    return page.waitForFunction(
      (selector: string, className: string) => {
        return document.querySelector(selector).className.includes(className);
      },
      { timeout: timeouts.normal },
      selector, className,
    );
  }

  public async fillField(page: Page, field: string, value: string): Promise<void> {
    const element = await page.$(field);
    return this.clearDataAndType(page, element, value);
  }

  public async isElementHasClass(page: Page, selector: string, expectedClass: string): Promise<boolean> {
    try {
      await this.waitForClass(page, selector, expectedClass);
      return true;
    } catch (err) {
      return false;
    }
  }



  public async getStatus(
    page: Page,
    callback: () => Promise<void>,
    urlToListen: string,
    timeout: number = timeouts.normal
  ): Promise<number> {
    try {
      // eslint-disable-next-line no-async-promise-executor,@typescript-eslint/no-misused-promises
      const status = await new Promise<number>(async (resolve, reject) => {
        const timer = setTimeout(reject, timeout);
        page.on(RESPONSE, function checkResponse(res: Response): void {
          const status: number = res.status();
          if (res.url().includes(urlToListen)) {
            clearTimeout(timer);
            page.removeListener(RESPONSE, checkResponse);
            return resolve(status);
          }
        })
        await callback();
      });
      return status;
    } catch (err) {
      throw new Error(errors.waitingForResponse(urlToListen, timeout));
    }
  }
}

export { Base };
