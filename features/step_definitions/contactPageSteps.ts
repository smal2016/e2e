import {Given, When, Then} from 'cucumber';
import {expect} from 'chai'
import {ContactPage} from "../pages/ContactPage/ContactPage";


When(/^I open (.*) page by direct url$/, async function(pageName){
    this.currentPage = new ContactPage()
    await this.currentPage.open(this.browser)
    expect(
        await this.currentPage.isPageOpened(),
        `${pageName} page is not opened, using direct url`
    ).to.be.true
});

Then(/^I see Contact form$/, async function(){
    expect(
        await this.currentPage.isContactFormPresent(),
        'Contact form does not present'
    ).to.be.true
});

Then(/^I submit form$/, async function(){
    await this.currentPage.formComponent.submitForm()
});

Then(/^I see Email field is highlighted in red$/, async function(){
    expect(
        await this.currentPage.formComponent.isEmailError()
    ).to.be.true
});

Then(/^I fill Email field with value: (.*)$/, async function(value){
    expect(
        await this.currentPage.formComponent.fillEmail(value)
    ).to.equal(value)
});

Then(/^I submit form and expect success$/, async function(){
    const status =  await this.currentPage.formComponent.validateSubmitForm()
    console.log('sasdfasdfasdfasdfasdf',status)
    expect(
       status
    ).to.equal(200)
});