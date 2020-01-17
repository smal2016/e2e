import { expect } from "chai";
import { Then } from "cucumber";

Then(/^I see Contact form$/, async function() {
  expect(
    await this.currentPage.isContactFormPresent(),
    "Contact form does not present",
  ).to.be.true;
});

Then(/^I submit form$/, async function() {
  await this.currentPage.formComponent.submitForm();
});

Then(/^I see Email field is highlighted in red$/, async function() {
  expect(
    await this.currentPage.formComponent.isEmailError(),
  ).to.be.true;
});

Then(/^I fill (First name|Last name|Email|Phone|Company|Job title) field with value: (.*)$/,
  async function(field: string, value: string) {
    const expectedValue = await this.currentPage.formComponent.fillFormField(field, value)
    expect(
      expectedValue
    ).to.equal(value);
  });

Then(/^I select about us value: (Outbound Sales)$/, async function(value: string) {
  expect(
    await this.currentPage.formComponent.selectAboutUs(value)
  ).to.equal(value);
});

Then(/^I submit form and expect status (.*)$/, async function(expectedStatus) {
  const status = await this.currentPage.formComponent.validateSubmitForm();
  expect(
    status,
  ).to.equal(Number(expectedStatus));
});
