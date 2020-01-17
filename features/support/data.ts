const urls = {
  baseUrl: "https://www.talenya.com",
};

const keys = {
  BACKSPACE: "Backspace",
  CONTROL: "Control",
  END: "End",
};

const options = {
  delays: {
    press: 10,
    type: 50,
  },
  puppeteer: {
    args: ["--disable-notifications", "--start-maximized"],
    headless: false,
  },
  timeouts: {
    normal: 30000,
  },
};

export { urls, options, keys }