/* eslint-disable @typescript-eslint/no-misused-promises */
import { Before, After } from 'cucumber'
import { options } from './support/data'
import { errorMessages as errors } from "./support/errorMessages"

Before(async function (): Promise<string|void> {
  try {
    this.browser = await this.driver.launch(options.puppeteer)
  } catch (err) {
    this.attach(errors.openingBrowser(err))
    return 'skipped'
  }
})

After(async function (): Promise<void>{
  if (this.browser) {
    await this.browser.close()
  }
})
