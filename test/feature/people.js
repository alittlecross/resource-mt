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

  describe('...and navigates to the people screen', () => {
    it('a resource manager should see a people list, along with the add and archive buttons', async () => {
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')
      await browser.clickLink('people')

      browser.assert.elements('a', 7)
      browser.assert.text('a:nth-child(4)', 'add')
      browser.assert.text('a:nth-child(5)', 'archive')
      browser.assert.text('a:nth-child(6)', 'Dwight Schrute')
      browser.assert.text('a:nth-child(7)', 'Michael Scott')
      browser.assert.url('http://localhost:3000/people')
    })

    it('a non-resource manager should only see a people list', async () => {
      await browser.fill('email', 'dwight.schrute@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')
      await browser.clickLink('people')

      browser.assert.elements('a', 5)
      browser.assert.text('a:nth-child(4)', 'Dwight Schrute')
      browser.assert.text('a:nth-child(5)', 'Michael Scott')
      browser.assert.url('http://localhost:3000/people')
    })
  })
})
