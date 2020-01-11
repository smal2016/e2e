// Dependencies
import { setWorldConstructor, setDefaultTimeout } from 'cucumber'
import puppeteer from 'puppeteer'

const defaultTimeout = 30000

const World = function ({ attach, parameters }): void {
  setDefaultTimeout(defaultTimeout)
  this.attach = attach
  this.driver = puppeteer
  this.test = true
}

setWorldConstructor(World)
