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

  describe('.getRequests', () => {
    it('should get leave from the database, and return an array of leave objects', async () => {
      sandbox.stub(DatabaseDashboard, 'getRequests').returns(Support.getLeaveRequestDouble())

      const results = await Dashboard.getRequests()

      expect(results.length).equal(3)
      expect(Object.keys(results[0]).length).equal(14)
      expect(results[0].requester).equal('Michael Scott')
    })
  })

  describe('.getPeople', () => {
    it('should get people from the database, build, and return an array of people objects', async () => {
      sandbox.stub(DatabaseDashboard, 'getPeople').returns(Support.getPeopleDouble())

      const results = await Dashboard.getPeople()

      expect(results.length).equal(2)
      expect(Object.keys(results[0]).length).equal(4)
      expect(results[0].firstName).equal('Dwight')
    })
  })
})
