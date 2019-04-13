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
