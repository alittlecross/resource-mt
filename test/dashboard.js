const DatabaseDashboard = require('../server/services/dashboard')
const Dashboard = require('../server/lib/dashboard')
const Leave = require('../server/lib/leave')
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

  describe('.getLeave', () => {
    it('should get leave from the database, for all people on a persons team, and return an array of objects representing calendar rows', async () => {
      sandbox.stub(DatabaseDashboard, 'getLeave').returns(Support.getLeaveDouble())
      sandbox.stub(Leave, 'bankHolidays').returns(Support.bankHolidaysSpecificWeekDouble())

      const results = await Dashboard.getLeave(1)
    })
  })

  describe('.getRequests', () => {
    it('should get leave from the database, for one person, and return an array of leave objects', async () => {
      sandbox.stub(DatabaseDashboard, 'getRequests').returns(Support.getRequestsDashboardDouble())

      const results = await Dashboard.getRequests()

      expect(results.length).equal(3)
      expect(Object.keys(results[0]).length).equal(10)
      expect(results[0].requester).equal('Michael Scott')
    })
  })
})
