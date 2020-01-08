import {Page} from 'puppeteer'
import {Base} from '../Base'

class ContactForm extends Base {
    public page: Page
    public form: string
    public firstName: string
    public lastName: string
    public email: string
    public phone: string
    public company: string
    public jobTitle: string
    public about_us: string
    public message: string
    public submitBtn: string
    public getField: (string) => string

    constructor(page: Page, form: string) {
        super()
        this.page = page
        this.form = form
        this.getField = className => `${this.form} [class*=${className}] input`
        this.firstName = this.getField('firstname')
        this.lastName = this.getField('lastname')
        this.email = this.getField('email')
        this.phone = this.getField('phone')
        this.company = this.getField('company')
        this.jobTitle = this.getField('jobtitle')
        this.about_us = this.getField('how_did_you_hear_about_us_')
        this.message = this.getField('message')
        this.submitBtn = '.actions>input[type="submit"]'
    }

    isFormPresent() {
        return this.isSelectorPresent(this.page, this.form)
    }

    async fillEmail(value: string) {
        const element = await this.page.$(this.email)
        await  this.fillField(this.page, this.email, value)
        return this.getTextElement(element)
    }

    submitForm(): Promise<void> {
        return this.clickOn(this.submitBtn, this.page)
    }

    isFieldError(selector): Promise<boolean> {
        return this.isElementHasClass(this.page, selector, 'error')
    }

    isEmailError(){
        return this.isFieldError(this.email)
    }

    async validateSubmitForm(){
        return this.getStatus(this.page, this.submitForm.bind(this), 'forms.hsforms.com/submissions')
    }



}

export {ContactForm}