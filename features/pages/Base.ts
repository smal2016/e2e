import {ElementHandle, Page} from 'puppeteer'
import { options, keys } from "../support/data";

const { delays, timeouts } = options

const errors = {
    waitingForResponse: (url, timeout = timeouts.normal) => `Waiting for response for url: ${url} takes more then ${timeout}`
}

class Base {
    async clearDataAndType(page: Page, element: ElementHandle, data) {
        let lengthEl = (await this.getTextElement(element)).length

        await element.focus()
        await page.keyboard.up(keys.CONTROL)
        await page.keyboard.press(keys.END, {delay: delays.press})

        for (let i = 0; i < lengthEl; i++) {
            await page.keyboard.press(keys.BACKSPACE, {delay: delays.press})
        }
        await element.type(data, {delay: delays.type})
    }

    getTextElement(element: ElementHandle) {
        let context = element.executionContext()
        return context.evaluate((myEl) => myEl.innerText || myEl.value, element)
    }

    async clickOn(selector: string, page: Page,) {
        const t = await page.waitForSelector(selector, {timeout: timeouts.normal})
        const p = await page.click(selector)
    }

    async isSelectorPresent(page: Page, selector: string, timeout: number = timeouts.normal) {
        try {
            await page.waitForSelector(selector, {timeout})
            return true
        } catch (err) {
            return false
        }
    }

    async waitForClass(page: Page, selector: string, className: string) {
        await page.waitForSelector(selector)
        return page.waitForFunction(
            (selector, className) => {
                return document.querySelector(selector).className.includes(className)
            },
            {timeout: timeouts.normal},
            selector, className
        )

    }

    async fillField(page: Page, field: string, value: string) {
        const element = await page.$(field)
        return this.clearDataAndType(page, element, value)
    }

    async isElementHasClass(page, selector, expectedClass) {
        try {
            await this.waitForClass(page, selector, expectedClass)
            return true
        } catch (err) {
            return false
        }
    }

    // listenResponse (page: Page, resolve, reject, url)  {
    //    return res => {
    //         const status = res.status()
    //         const timer = setTimeout(reject, timeouts.normal)
    //         if(res.url().includes(url)){
    //             page.removeListener('response', this.listenResponse)
    //             clearTimeout(timer)
    //             resolve(status)
    //         }
    //     }
    // }

    async getStatus(page: Page, submitForm: ()=> Promise<void>, urlToListen: string){
        try{
            const status = await new Promise(async(resolve, reject)=> {
                const timer = setTimeout(reject, 5000)
                page.on('response', function listenResponse (res)  {
                    const status = res.status()
                    if(res.url().includes(urlToListen)){
                        clearTimeout(timer)
                        page.removeListener('response', listenResponse)
                        return resolve(status)
                    }
                })
                await submitForm()
            })
            return status
        }catch(err){
            throw new Error(errors.waitingForResponse(urlToListen))
        }
    }
}

export {Base}