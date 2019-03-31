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

  describe('...and navigates to a person', () => {
    it(`a resource manager should see a person's details, along with the edit button`, async () => {
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')
      await browser.clickLink('Dwight Schrute')

      browser.assert.elements('a', 4)
      browser.assert.text('form>a', 'edit')
      browser.assert.url('http://localhost:3000/2/person')
    })

    it(`a non-resource manager should only see a person's details`, async () => {
      await browser.fill('email', 'dwight.schrute@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')
      await browser.clickLink('Dwight Schrute')

      browser.assert.elements('a', 3)
      browser.assert.url('http://localhost:3000/2/person')
    })
  })
})
