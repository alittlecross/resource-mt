const DatabaseLeaveAction = require('../../server/services/leave/action')
const LeaveAction = require('../../server/lib/leave/action')

const expect = require('chai').expect

describe('class LeaveAction', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('constructor', () => {
    it('should pass the leave status change to the database', () => {
      let changeStatus = sandbox.stub(DatabaseLeaveAction, 'changeStatus')

      LeaveAction.changeStatus()

      expect(changeStatus.callCount).equal(1)
    })
  })
})
