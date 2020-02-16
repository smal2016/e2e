import { PageClass } from "./types";

const pages = {
  get GooglePage(): PageClass {
    return require('./HomePage/HomePage').HomePage;
  },
};

export { pages };