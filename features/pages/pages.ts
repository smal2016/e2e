import { PageClass } from "./types";

const pages = {
  get HomePage(): PageClass {
    return require('./HomePage/HomePage').HomePage;
  },
  get ContactPage(): PageClass {
    return require('./ContactPage/ContactPage').ContactPage;
  }
};

export { pages };