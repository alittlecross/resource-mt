const DatabasePeople = require('../server/services/people')
const LogIn = require('../server/lib/log-in')
const People = require('../server/lib/people')
const Support = require('./support')

const expect = require('chai').expect

describe('class logIn', () => {
  let sandbox

  beforeEach(async () => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.authenticate', () => {
    it('correct email and password should be successful', async () => {
      sandbox.createStubInstance(People, Support.objectDouble())
      sandbox.stub(DatabasePeople, 'getPeople').returns(Support.getPeopleDouble())

      const result = await LogIn.authenticate({ email: 'dwight.schrute@scranton.com', password: 'password' })

      expect(result.status).equal(true)
      expect(result.user.firstName).equal('Dwight')
    })

    it('incorrect password should be unsuccessful', async () => {
      sandbox.stub(DatabasePeople, 'getPeople').returns(Support.getPeopleDouble())

      const result = await LogIn.authenticate({ email: 'dwight.schrute@scranton.com', password: 'BattlestarGalactica' })

      expect(result.status).equal(false)
      expect(result.message).equal('email or password incorrect')
    })

    it('incorrect email should be unsuccessful', async () => {
      sandbox.stub(DatabasePeople, 'getPeople').returns({ rowCount: 0 })
      const result = await LogIn.authenticate({ email: 'dwight.schrute@scranton.com', password: 'password' })

      expect(result.status).equal(false)
      expect(result.message).equal('email or password incorrect')
    })

    it('correct email with no password should be unsuccessful', async () => {
      sandbox.stub(DatabasePeople, 'getPeople').returns({ rowCount: 1 })
      const result = await LogIn.authenticate({ email: 'dwight.schrute@scranton.com' })

      expect(result.status).equal(true)
      expect(result.message).equal('email or password incorrect')
    })
  })
})
