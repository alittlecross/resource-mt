const DatabaseLeaveAction = require('../../services/leave/action')

class LeaveAction {
  static async changeStatus (data) { await DatabaseLeaveAction.changeStatus(data) }
}

module.exports = LeaveAction
