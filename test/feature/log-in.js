const Browser = require('zombie')
const Helper = require('../support')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('User visits the log in screen', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  before(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()
    await Helper.createUsers()
  })

  describe('...by completeing and submitting the form', () => {
    it('correct email and password should be successful', async () => {
      await browser.visit('/')
      await browser.fill('email', 'dwight.schrute@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      browser.assert.url('http://localhost:3000/dashboard')
    })

    it('incorrect email should be unsuccessful', async () => {
      await browser.visit('/')
      await browser.fill('email', 'michael@scranton.com')
      await browser.fill('password', 'incorrect')
      await browser.pressButton('log in')

      browser.assert.url('http://localhost:3000/')
      browser.assert.text('#flash', 'no account with that email')
    })

    it('incorrect password should be unsuccessful', async () => {
      await browser.visit('/')
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'incorrect')
      await browser.pressButton('log in')

      browser.assert.url('http://localhost:3000/')
      browser.assert.text('#flash', 'password incorrect')
    })
  })
})
