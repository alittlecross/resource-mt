const DatabaseLeave = require('../server/services/leave')
const Leave = require('../server/lib/leave')
const Support = require('../test/support')

const expect = require('chai').expect

describe('class Leave', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('constructor', () => {
    it('should return a leave object', () => {
      const result = new Leave(Support.getLeaveRequestDouble().rows.filter(row => row.type === 'request')[0])

      expect(Object.keys(result).length).equal(10)
      expect(result.date).equal('04/04/19')
    })
  })

  describe('.formatDate', () => {
    it('should return a date string in shortdate format', () => {
      const datelow = Leave.formatDate('2019-04-03T23:00:00.000Z')
      const datehigh = Leave.formatDate('2019-12-12T00:00:00.000Z')

      expect(datelow).equal('04/04/19')
      expect(datehigh).equal('12/12/19')
    })
  })

  describe('bankHolidays', () => {
    it('should return an array of bank holiday dates', async () => {
      sandbox.stub(DatabaseLeave, 'bankHolidays').returns(Support.bankHolidaysDouble())

      const results = await Leave.bankHolidays()

      expect(results.length).equal(8)
    })
  })

  describe('.getBalance', () => {
    it('should return a balance object', () => {
      const result = Leave.getBalance(Support.balanceObjectDouble(), Support.leaveObjectArrayDouble())

      expect(result.takenSoFar).equal(1)
      expect(result.planned).equal(1)
      expect(result.requested).equal(1)
    })
  })

  describe('.getLeave', () => {
    it('should return an objects showing balance and requests', async () => {
      sandbox.stub(DatabaseLeave, 'getLeave').returns(Support.getLeaveRequestDouble())

      const result = await Leave.getLeave()

      expect(result.balance.allowance).equal(20)
      expect(result.requests.length).equal(3)
      expect(result.requests[0].status).equal('pending')
    })
  })

  describe('.submitRange', () => {
    it('should construct a leave request string', async () => {
      sandbox.stub(DatabaseLeave, 'getLeave').returns(Support.getLeaveRequestDouble())
      sandbox.stub(DatabaseLeave, 'submitRequest')

      const result = await Leave.submitRequest(Support.submitRequestDouble())

      expect(result.status).equal(true)
    })

    it('should construct a leave request string (no JS)', async () => {
      sandbox.stub(DatabaseLeave, 'getLeave').returns(Support.getLeaveRequestDouble())
      sandbox.stub(DatabaseLeave, 'submitRequest')

      const result = await Leave.submitRequest(Support.submitRequestNoJsDouble())

      expect(result.status).equal(true)
    })

    it('should return a message if submitting a duplicate request', async () => {
      sandbox.stub(DatabaseLeave, 'getLeave').returns(Support.getLeaveRequestDouble())

      const result = await Leave.submitRequest(Support.submitDuplicateRequestDouble())

      expect(result.status).equal(false)
    })

    it('should return a message if submitting a duplicate requests', async () => {
      sandbox.stub(DatabaseLeave, 'getLeave').returns(Support.getLeaveRequestDouble())

      const result = await Leave.submitRequest(Support.submitDuplicateRequestsDouble())

      expect(result.status).equal(false)
    })
  })
})
