const DatabaseConnection = require('../../db/database-connection')

class DatabaseDashboard {
  static async getRequests (personId) {
    return DatabaseConnection.query(`
      SELECT leaveid, leave.personid, leavedate, duration, leavetype, status, CONCAT(firstname, ' ', surname) as requester
      FROM leave
      INNER JOIN durations
      ON leave.durationid = durations.durationid
      INNER JOIN leavetypes
      ON leave.typeid = leavetypes.typeid
      INNER JOIN leavestatuses
      ON leave.statusid = leavestatuses.statusid
      INNER JOIN people
      ON leave.personid = people.personid
      WHERE managerid = $1 AND status = 'pending'
            
      ORDER BY leaveid;
    `, [personId])
  }

  static async getPeople (personId) {
    return DatabaseConnection.query(`
      SELECT *
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      WHERE managerid = $1 AND personid != $1 AND archived = FALSE

      ORDER BY firstname, surname;
    `, [personId])
  }
}

module.exports = DatabaseDashboard
