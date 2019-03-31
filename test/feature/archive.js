const Browser = require('zombie')
const support = require('../support')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('When a resource manager navigates to a person screen', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  beforeEach(async () => {
    await support.changeEnvironment()
    await support.truncateDatabase()
    await support.createUsers()
    await browser.visit('/')
  })

  describe('...edits them and clicks the archive button', () => {
    it('that person should be archived', async () => {
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')
      await browser.clickLink('Dwight Schrute')
      await browser.clickLink('edit')
      await browser.clickLink('archive')
      await browser.clickLink('archive')

      browser.assert.elements('a', 6)
      browser.assert.text('a:nth-child(6)', 'Dwight Schrute')
      browser.assert.url('http://localhost:3000/people/archive')
    })
  })

  describe('...when a non-resource manager directly visits the url', () => {
    it('they should be redirected to the person screen', async () => {
      await browser.fill('email', 'dwight.schrute@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      await browser.visit('/2/person/archive/true')

      browser.assert.url('http://localhost:3000/2/person')
    })
  })
})
