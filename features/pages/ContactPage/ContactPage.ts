import {Page} from 'puppeteer'
import {BasePage} from '../BasePage'
import { ContactForm } from './ContactForm'

class ContactPage extends BasePage {
    public page: Page
    public pageTitle: string
    public contactForm: string

    public formComponent: ContactForm | null

    constructor(page = null) {
        super(page)
        this.page = page
        this.pageTitle = '.formHeadline'
        this.contactForm = '.hbspt-form>form'
        this.formComponent = null
    }

    get url(){
        return 'contact-us'
    }

    isPageOpened(){
        return this.isSelectorPresent(this.page, this.pageTitle)
    }

    open(browser) {
        return super.open(browser, this.url)
    }

    isContactFormPresent(){
        this.formComponent = new ContactForm(this.page, this.contactForm)
        return this.formComponent.isFormPresent()
    }

}


export {ContactPage}