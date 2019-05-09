const DatabaseLeaveDelete = require('../../server/services/leave/delete')
const LeaveDelete = require('../../server/lib/leave/delete')

const expect = require('chai').expect

describe('class LeaveDelete', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('constructor', () => {
    it('should delete the leave record from the database', () => {
      let deleteLeave = sandbox.stub(DatabaseLeaveDelete, 'deleteLeave')

      LeaveDelete.deleteLeave()

      expect(deleteLeave.callCount).equal(1)
    })
  })
})
