const Browser = require('zombie')
const Helper = require('../support')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('Resource Manager adds a person', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  before(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()
    await Helper.createUsers()
  })

  describe('...by completeing and submitting the form', () => {
    it('a person should be created', async () => {
      await browser.visit('/')
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')
      await browser.clickLink('people')
      await browser.clickLink('add')
      await browser.fill('staffId', 'JH1234')
      await browser.fill('firstName', 'Jim')
      await browser.fill('surname', 'Halpert')
      await browser.fill('email', 'jim.halpert@scranton.com')
      await browser.select('gradeId', 'EO')
      await browser.select('roleId', 'Sales Representative')
      await browser.select('locationId', 'Scranton')
      await browser.select('statusId', 'Permanent')
      await browser.select('managerId', 'Michael Scott')
      await browser.select('skills', 'Selling')
      await browser.pressButton('add')

      browser.assert.url('http://localhost:3000/people')
    })

    it('an error message is shown if a staff number or email already in use', async () => {
      await browser.visit('/')
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')
      await browser.clickLink('people')
      await browser.clickLink('add')
      await browser.fill('staffId', 'JH1234')
      await browser.fill('firstName', 'Jim')
      await browser.fill('surname', 'Halpert')
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.select('gradeId', 'EO')
      await browser.select('roleId', 'Sales Representative')
      await browser.select('locationId', 'Scranton')
      await browser.select('statusId', 'Permanent')
      await browser.select('managerId', 'Michael Scott')
      await browser.select('skills', 'Selling')
      await browser.pressButton('add')

      browser.assert.url('http://localhost:3000/person/add')
      browser.assert.text('#flash', 'staff number or email already in use')
    })
  })
})
