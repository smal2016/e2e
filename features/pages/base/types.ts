import { Page } from "puppeteer"

type PageObject = {
    url: string;
    isPageOpened(): Promise<boolean>;
    open(): Promise<void>;
}

type PageClass = {
    new(page?: Page): PageObject;
}

export { PageObject, PageClass }