const urls = {
    baseUrl: 'https://www.talenya.com/'
}

const keys = {
    CONTROL: 'Control',
    END: 'End',
    BACKSPACE: 'Backspace'
}

const options = {
    puppeteer:{
        headless: false,
        args: ['--disable-notifications', '--start-maximized'],
    },
    timeouts:{
        normal:10000
    },
    delays: {
        type: 50,
        press: 10
    }
}

export { urls, options, keys }
