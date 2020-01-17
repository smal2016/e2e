const pages = {
  get HomePage(){
    return require('./HomePage/HomePage').HomePage
  },
  get ContactPage(){
    return require('./ContactPage/ContactPage').ContactPage
  }
}

export { pages }