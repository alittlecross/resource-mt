const Browser = require('zombie')
const support = require('../support')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('When a user follows a reset password link', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  beforeEach(async () => {
    await support.changeEnvironment()
    await support.truncateDatabase()
    await support.createUsers()
    await browser.visit('/123456/forgot-password')
  })

  describe(`...then enters a password in both boxes and clicks submit`, () => {
    it('their password should be reset if both boxes match', async () => {
      await browser.fill('password', 'dunder')
      await browser.fill('repassword', 'dunder')
      await browser.pressButton('submit')

      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'dunder')
      await browser.pressButton('log in')

      browser.assert.url('http://localhost:3000/dashboard')
    })

    it('they should see an error message if both boxes do not match', async () => {
      await browser.fill('password', 'dunder')
      await browser.fill('repassword', 'miflin')
      await browser.pressButton('submit')

      browser.assert.url('http://localhost:3000/123456/forgot-password')
    })
  })
})
