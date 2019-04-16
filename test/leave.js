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
      const result = new Leave(Support.getRequestDouble().rows[0])

      expect(result.duration).equal('all day')
    })
  })

  describe('formatDate', () => {
    it('should return a date string in shortdate format', () => {
      const leave = new Leave([])

      const datelow = leave.formatDate('2019-04-03T23:00:00.000Z')
      const datehigh = leave.formatDate('2019-12-12T00:00:00.000Z')

      expect(datelow).equal('04/04/19')
      expect(datehigh).equal('12/12/19')
    })
  })

  describe('formatDuration', () => {
    it('should return a duration string', () => {
      const leave = new Leave([])

      const halfday = leave.formatDuration('am')
      const allday = leave.formatDuration('both')

      expect(halfday).equal('am')
      expect(allday).equal('all day')
    })
  })

  describe('formatStatus', () => {
    it('should return a status string', () => {
      const leave = new Leave([])

      const approved = leave.formatStatus(true)
      const pending = leave.formatStatus(false)

      expect(approved).equal('approved')
      expect(pending).equal('pending')
    })
  })

  describe('.getRequest', () => {
    it('should return and array of leave objects', async () => {
      sandbox.stub(DatabaseLeave, 'getRequest').returns(Support.getRequestDouble())

      const result = await Leave.getRequest()

      expect(result.length).equal(3)
      expect(result[0].status).equal('pending')
    })
  })

  describe('.submitRange', () => {
    it('should construct a leave request string', async () => {
      const leave = sandbox.stub(DatabaseLeave, 'submitRequest')

      await Leave.submitRequest(Support.submitRequestDouble())

      expect(leave.callCount).equal(1)
    })

    it('should construct a leave request string (no JS)', async () => {
      const leave = sandbox.stub(DatabaseLeave, 'submitRequest')

      await Leave.submitRequest(Support.submitRequestNoJsDouble())

      expect(leave.callCount).equal(1)
    })
  })
})
