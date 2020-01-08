import { urls, options } from '../support/data'
import {Page, Browser, Response} from 'puppeteer'
import { Base } from './Base'

class BasePage extends Base {
    public page: Page
    constructor(page: Page | null){
        super()
        this.page = page
    }
    async open(browser: Browser, pageUrl: string): Promise<Response | null>{
        this.page = await browser.newPage()
        const url = `${urls.baseUrl}/${pageUrl}`
        return this.page.goto(url, {timeout: options.timeouts.normal})

    }
}

export { BasePage }