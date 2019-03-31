const Browser = require('zombie')
const support = require('../support')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('When a user chooses to log out', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  before(async () => {
    await support.changeEnvironment()
    await support.truncateDatabase()
    await support.createUsers()
  })

  describe('...by clicking the log out link', () => {
    it('they should be redirected to the log in screen', async () => {
      await browser.visit('/')
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      await browser.clickLink('log out')

      browser.assert.url('http://localhost:3000')
    })
  })
})
