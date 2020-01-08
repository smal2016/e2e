// Dependencies
import { setWorldConstructor, setDefaultTimeout } from 'cucumber'
import {options } from './support/data'
import puppeteer  from 'puppeteer'

const World = function ({ attach, parameters }) {
    setDefaultTimeout(options.timeouts.normal);
    this.attach = attach
    this.driver = puppeteer
    this.test = true
}



setWorldConstructor(World)
