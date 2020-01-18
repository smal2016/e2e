import { Browser, Page } from "puppeteer";

interface PageObject  {
    url: string;
    isPageOpened(): Promise<boolean>;
    open(browser: Browser): Promise<void>;
}

interface PageClass  {
    new(page?: Page): PageObject;
}

export { PageObject, PageClass };