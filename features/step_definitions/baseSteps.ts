import { expect } from "chai";
import { When } from "cucumber";
import { pages } from '../pages/pages'
import { PageClass } from "../pages/base/types"

const getPageByName = (pageName: string): PageClass => {
  const expectedPage = `${pageName}Page`
  return pages[expectedPage]
}

When(/^I open (.*) page by direct url$/,
  async function(pageName: string) {
    const PageToOpen = getPageByName(pageName)
    this.currentPage = new PageToOpen();
    await this.currentPage.open(this.browser);
    expect(
      await this.currentPage.isPageOpened(),
      `${pageName} page is not opened, using direct url`,
    ).to.be.true;
  }
);

When(/^I click on footer "(Contact us|Follow us)" button and go to (.*) page$/,
  async function(link: string, pageName: string) {
    this.currentPage = await this.currentPage.footer.clickOnFooterLink(link)
    expect(
      await this.currentPage.isPageOpened(),
      `${pageName} page is not opened, using direct url`,
    ).to.be.true;
  }
);
