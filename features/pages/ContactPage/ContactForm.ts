import { Page } from 'puppeteer'
import { Base } from '../Base'

class ContactForm extends Base {
    public firstName: string
    public lastName: string
    public email: string
    public phone: string
    public company: string
    public jobTitle: string
    public aboutUs: string
    public message: string
    public submitBtn: string
    public getField: (string) => string

    constructor (public page: Page, public form: string) {
      super()
      this.getField = (className: string): string => `${this.form} [class*=${className}] input`
      this.firstName = this.getField('firstname')
      this.lastName = this.getField('lastname')
      this.email = this.getField('email')
      this.phone = this.getField('phone')
      this.company = this.getField('company')
      this.jobTitle = this.getField('jobtitle')
      this.aboutUs = this.getField('how_did_you_hear_about_us_')
      this.message = this.getField('message')
      this.submitBtn = '.actions>input[type="submit"]'
    }

    isFormPresent (): Promise<boolean> {
      return this.isSelectorPresent(this.page, this.form)
    }

    isFieldError (selector: string): Promise<boolean> {
      return this.isElementHasClass(this.page, selector, 'error')
    }

    isEmailError (): Promise<boolean> {
      return this.isFieldError(this.email)
    }

    async fillEmail (value: string): Promise<string> {
      const element = await this.page.$(this.email)
      await this.fillField(this.page, this.email, value)
      return this.getTextElement(element)
    }

    submitForm (): Promise<void> {
      return this.clickOn(this.submitBtn, this.page)
    }

    async validateSubmitForm (): Promise<number> {
      return this.getStatus(this.page, this.submitForm.bind(this), 'forms.hsforms.com/submissions')
    }
}

export { ContactForm }
