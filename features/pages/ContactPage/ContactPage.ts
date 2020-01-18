import { Page, Browser } from 'puppeteer';
import { BasePage } from "../BasePage/BasePage";
import { ContactForm } from './ContactForm';
import { PageObject } from "../types";

class ContactPage extends BasePage implements PageObject {
    public pageTitle = '.formHeadline'
    public contactForm = '.hbspt-form>form'
    public formComponent: ContactForm | null

    constructor (public page: Page = null) {
      super(page);
      this.formComponent = null;
    }

    get url (): string {
      return 'contact-us';
    }

    public open (browser: Browser): Promise<void> {
      return super.open(browser, this.url);
    }

    public isPageOpened (): Promise<boolean> {
      return this.isSelectorPresent(this.page, this.pageTitle);
    }

    public isContactFormPresent (): Promise<boolean> {
      this.formComponent = new ContactForm(this.page, this.contactForm);
      return this.formComponent.isFormPresent();
    }
}

export { ContactPage };
