const DatabaseConnection = require('../../../db/database-connection')

class DatabaseLeaveDelete {
  static async deleteLeave (leaveId) {
    return DatabaseConnection.query(`
      DELETE FROM leave
      
      WHERE leaveid = $1
    `, [leaveId])
  }
}

module.exports = DatabaseLeaveDelete
