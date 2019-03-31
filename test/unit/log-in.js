const databasePeople = require('../../server/services/people')
const logIn = require('../../server/lib/log-in')
const people = require('../../server/lib/people')
const support = require('../support')

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
      sandbox.stub(people, 'object').returns(support.objectDouble())
      sandbox.stub(databasePeople, 'getPeople').returns(support.getPeopleDouble())

      let result = await logIn.authenticate({ email: 'dwight.schrute@scranton.com', password: 'password' })

      expect(result.status).equal(true)
      expect(result.user.firstName).equal('Dwight')
    })

    it('incorrect password should be unsuccessful', async () => {
      sandbox.stub(databasePeople, 'getPeople').returns(support.getPeopleDouble())

      let result = await logIn.authenticate({ email: 'dwight.schrute@scranton.com', password: 'BattlestarGalactica' })

      expect(result.status).equal(false)
      expect(result.message).equal('password incorrect')
    })

    it('incorrect email should be unsuccessful', async () => {
      sandbox.stub(databasePeople, 'getPeople').returns({ rowCount: 0 })
      let result = await logIn.authenticate({ email: 'dwight.schrute@scranton.com', password: 'password' })

      expect(result.status).equal(false)
      expect(result.message).equal('no account with that email')
    })
  })
})
