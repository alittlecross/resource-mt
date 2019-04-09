const DatabaseDashboard = require('../server/services/dashboard')
const Dashboard = require('../server/lib/dashboard')
const Support = require('./support')

const expect = require('chai').expect

describe('class Dashboard', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.getPeople', () => {
    it('should get people from the database, build, and return a people array', async () => {
      sandbox.stub(DatabaseDashboard, 'getPeople').returns(Support.getPeopleDouble())

      const results = await Dashboard.getPeople()

      expect(results.length).equal(2)
      expect(Object.keys(results[0]).length).equal(4)
      expect(results[0].firstName).equal('Dwight')
    })
  })
})
