import { expect } from "chai";
import { When } from "cucumber";
import { pages } from '../pages/pages';
import { PageClass } from "../pages/types";

const getPageByName = (pageName: string): PageClass => {
  const expectedPage = `${pageName}Page`;
  return pages[expectedPage];
};

When(/^I open (.*) page by direct url$/,
  async function(pageName: string) {
    const PageToOpen: PageClass = getPageByName(pageName);
    this.currentPage = new PageToOpen();
    await this.currentPage.open(this.browser);
    expect(
      await this.currentPage.isPageOpened(),
      `${pageName} page is not opened, using direct url`,
    ).to.be.true;
  }
);
