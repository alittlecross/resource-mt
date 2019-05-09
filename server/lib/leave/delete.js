const DatabaseLeaveDelete = require('../../services/leave/delete')

class LeaveDelete {
  static async deleteLeave (leaveId) {
    await DatabaseLeaveDelete.deleteLeave(leaveId)
  }
}

module.exports = LeaveDelete
