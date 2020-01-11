const errorMessages = {
  waitingForResponse: (url: string, timeout: number): string =>
    `Waiting for response from url: ${url} takes more then ${timeout} ms`,
  waitingForSelector: (selector: string, timeout: number): string =>
    `Waiting for selector: ${selector} takes more then ${timeout}`,
  waitingForPageLoad: (url: string, timeout: number): string =>
    `Page with url: ${url} was not loaded in ${timeout} ms`,
  openingBrowser: (err: Error): string => `There was a problem with opening the browser: \n ${err}`
};

export { errorMessages }