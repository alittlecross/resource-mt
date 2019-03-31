const Browser = require('zombie')
const support = require('../support')

const app = require('../../app')
const http = require('http')

http.createServer(app)

describe('When a resource manager navigates to the add person screen', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })

  beforeEach(async () => {
    await support.changeEnvironment()
    await support.truncateDatabase()
    await support.createUsers()
    await browser.visit('/')
  })

  describe('...then completes and submits the add person form', () => {
    it('a person should be created', async () => {
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
      await browser.pressButton('submit')

      browser.assert.url('http://localhost:3000/3/person')
    })

    it('a flash message should be shown if a staff number or email is already in use', async () => {
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
      await browser.pressButton('submit')

      browser.assert.url('http://localhost:3000/person/add')
      browser.assert.text('#flash', 'staff number or email already in use')
    })
  })

  describe('...when a non-resource manager directly visits the url', () => {
    it('they should be redirected to the people screen', async () => {
      await browser.fill('email', 'dwight.schrute@scranton.com')
      await browser.fill('password', 'password')
      await browser.pressButton('log in')

      await browser.visit('/person/add')

      browser.assert.url('http://localhost:3000/people')
    })
  })
})
