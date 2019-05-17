const DatabaseConnection = require('../../../db/database-connection')

class DatabaseLeaveAction {
  static async changeStatus (data) {
    return DatabaseConnection.query(`
      UPDATE leave
      SET statusid = $2
      
      WHERE leaveid = $1;
    `, [data.leaveId, data.action])
  }
}

module.exports = DatabaseLeaveAction
