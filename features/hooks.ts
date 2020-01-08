import { Before, After } from 'cucumber'
import { options } from './support/data'

Before(async function () {
    try {
        this.browser = await this.driver.launch(options.puppeteer)
    } catch (e) {
        this.attach(`There was a problem with opening the browser: \n ${e}`)
        return 'skipped'
    }
});

After(async function (testCase) {
    if (this.hasOwnProperty('browser')) {
        await this.browser.close()
    }
})