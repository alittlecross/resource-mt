const Browser = require('zombie')
const Helper = require('../support/person-helpers')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('User visits dashboard page', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  before(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()
    await Helper.createUsers()
  })

  describe('submits form', () => {
    it('a manager should see a people list', async () => {
      await browser.visit('/')
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      browser.assert.text('div', 'Dwight Schrute')
    })

    it('a non-manager should not see a people list', async () => {
      await browser.visit('/')
      await browser.fill('email', 'dwight.schrute@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      browser.assert.text('body', '')
    })
  })
})
