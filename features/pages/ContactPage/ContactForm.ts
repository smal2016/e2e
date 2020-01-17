import { Page } from 'puppeteer'
import { Base } from '../base/Base'
import  camelcase  from 'lodash.camelcase'

const ERROR_CLASS = 'error'

class ContactForm extends Base {
    private requestedUrl = 'forms.hsforms.com/submissions'
    public getField = (className: string): string => `${this.form} [class*=${className}] input`
    public firstName = this.getField('firstname')
    public lastName = this.getField('lastname')
    public email = this.getField('email')
    public phone = this.getField('phone')
    public company = this.getField('company')
    public jobTitle = this.getField('jobtitle')
    public aboutUs = 'select[id*="how_did_you_hear_about_us"]'
    public submitBtn = '.actions>input[type="submit"]'
    public message = this.getField('message')

    constructor (public page: Page, public form: string) {
      super()
    }

    isFormPresent (): Promise<boolean> {
      return this.isSelectorPresent(this.page, this.form)
    }

    isFieldError (selector: string): Promise<boolean> {
      return this.isElementHasClass(this.page, selector, ERROR_CLASS)
    }

    isEmailError (): Promise<boolean> {
      return this.isFieldError(this.email)
    }

    fillFormField(fieldName: string, value: string): Promise<string>{
      const field = camelcase(fieldName)
      return this.fillField(this.page, this[field], value)
    }

    public async selectAboutUs(value: string): Promise<string>{
      const selectedValues = await this.selectValue(this.page, this.aboutUs, value)
      return selectedValues.toString()
    }

    submitForm (): Promise<void> {
      return this.clickOn(this.submitBtn, this.page)
    }

    async validateSubmitForm (): Promise<number> {
      return this.getStatus(this.page, this.submitForm.bind(this), this.requestedUrl)
    }
}

export { ContactForm }
