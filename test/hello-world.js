const Browser = require('zombie')

const app = require('../app')
const http = require('http')

http.createServer(app)

describe('User visits index page', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  before(() => {
    return browser.visit('/')
  })

  it('should display "Hello World', () => {
    browser.assert.text('body', 'Hello World')
  })
})
