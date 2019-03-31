const Browser = require('zombie')
const support = require('../support')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('When a user logs in', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  beforeEach(async () => {
    await support.changeEnvironment()
    await support.truncateDatabase()
    await support.createUsers()
    await browser.visit('/')
  })

  describe('...and is redirected to the dashboard screen', () => {
    it('a resource manager should see a people list', async () => {
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      browser.assert.elements('a', 5)
      browser.assert.text('a:nth-child(4)', 'Michael Scott')
      browser.assert.text('a:nth-child(5)', 'Dwight Schrute')
    })

    it('a non-resource manager should not see a people list', async () => {
      await browser.fill('email', 'dwight.schrute@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      browser.assert.elements('a', 4)
      browser.assert.text('a:nth-child(4)', 'Dwight Schrute')
    })
  })
})
