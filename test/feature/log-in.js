const Browser = require('zombie')
const support = require('../support')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('When a user visits the log in screen', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  beforeEach(async () => {
    await support.changeEnvironment()
    await support.truncateDatabase()
    await support.createUsers()
    await browser.visit('/')
  })

  describe('...then completes and submits the log in form', () => {
    it('a correct email and password should be successful', async () => {
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      browser.assert.url('http://localhost:3000/dashboard')
    })

    it('an incorrect email should be unsuccessful', async () => {
      await browser.fill('email', 'michael.scott@scranton.co.uk')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      browser.assert.url('http://localhost:3000/')
      browser.assert.text('#flash', 'no account with that email')
    })

    it('an incorrect password should be unsuccessful', async () => {
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'incorrect')
      await browser.pressButton('log in')

      browser.assert.url('http://localhost:3000/')
      browser.assert.text('#flash', 'password incorrect')
    })
  })
})
