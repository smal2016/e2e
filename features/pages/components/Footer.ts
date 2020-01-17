import { Base } from "../base/Base"
import { pages } from "../pages"
import { Page } from "puppeteer"
import  camelcase  from 'lodash.camelcase'
import { PageObject } from "../base/types"

class Footer extends Base {
    public contactUs = { selector:".about-contact a", PageToGo: pages.ContactPage }

    constructor(public page: Page){
      super()
    }

    async clickOnFooterLink(buttonName: string): Promise<PageObject>{
      const currentBtn = this[camelcase(buttonName)]
      const { selector, PageToGo } = currentBtn
      return this.clickAndNavigate(this.page, selector, PageToGo)
    }
}

export { Footer }