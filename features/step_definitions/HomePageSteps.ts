import { expect } from "chai";
import { Then, When } from "cucumber";

When(/^I fill search field with value: (.*)$/,
  async function(value: string) {
    const expectedValue = await this.currentPage.fillSearch(value);
    expect(
      expectedValue
    ).to.equal(value);
  }
);

Then(/^I submit form$/,
  async function() {
    await this.currentPage.submitForm();
  }
);

Then(/^I see results match with (.*)$/,
  async function(input) {
    const searchResults = await this.currentPage.getResultsText();
    expect(searchResults).to.match(new RegExp(input));
  }
);


