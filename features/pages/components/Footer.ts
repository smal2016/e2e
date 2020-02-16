import { Base } from "../BasePage/Base";
import { Page } from "puppeteer";

class Footer extends Base {
  constructor(public page: Page){
    super();
  }
}

export { Footer };