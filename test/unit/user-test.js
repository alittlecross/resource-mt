const Helper = require('../support/person-helpers')
const User = require('../../lib/user')
const Person = require('../../lib/person')

const expect = require('chai').expect

describe('class User', () => {
  let sandbox

  beforeEach(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()

    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.getCurrentUserRecord', () => {
    it('should return a user record from the database', async () => {
      await Helper.createUsers()

      let result = await User.getCurrentUserRecord('michael.scott@scranton.com')

      expect(result.rows[0].firstname).equal('Michael')
    })
  })

  describe('.logIn', () => {
    it('correct email and password should be successful', async () => {
      await Helper.createUsers()

      sandbox.stub(Person, 'buildPersonObjects').returns(Helper.peopleArrayDouble())

      let result = await User.logIn({ email: 'michael.scott@scranton.com', password: 'password' })

      expect(result.status).equal(true)
    })

    it('incorrect email should be unsuccessful', async () => {
      await Helper.createUsers()

      let result = await User.logIn({ email: 'michael@scranton.com', password: 'password' })

      expect(result.status).equal(false)
    })

    it('incorrect password should be unsuccessful', async () => {
      await Helper.createUsers()

      let result = await User.logIn({ email: 'michael.scott@scranton.com', password: 'incorrect' })

      expect(result.status).equal(false)
    })
  })
})
