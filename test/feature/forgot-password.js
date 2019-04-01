const Browser = require('zombie')
const email = require('../../server/lib/email')
const support = require('../support')

const app = require('../../app')
const expect = require('chai').expect
const http = require('http')

http.createServer(app)

describe('When a user visits the log in screen', () => {
  const browser = new Browser({ site: 'http://localhost:3000' })
  let sandbox

  beforeEach(async () => {
    sandbox = require('sinon').createSandbox()

    await support.changeEnvironment()
    await support.truncateDatabase()
    await support.createUsers()
    await browser.visit('/')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe(`...clicks the 'forgot your password' link, and then completes and submits the form`, () => {
    it('they should receive an email with a password reset link if they have an account', async () => {
      let send = sandbox.stub(email, 'send')

      await browser.clickLink('forgot your password?')
      await browser.fill('email', 'michael.scott@scranton.com')
      await browser.pressButton('submit')

      browser.assert.url('http://localhost:3000')

      expect(send.callCount).equal(1)
    })

    it('they should not receive an email with a password reset link if they do not have an account', async () => {
      await browser.clickLink('forgot your password?')
      await browser.fill('email', 'jim.halpert@scranton.com')
      await browser.pressButton('submit')

      browser.assert.url('http://localhost:3000/forgot-password')
    })
  })
})
