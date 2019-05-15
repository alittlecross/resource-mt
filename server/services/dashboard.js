const DatabaseConnection = require('../../db/database-connection')

class DatabaseDashboard {
  static async getRequests (personId) {
    return DatabaseConnection.query(`
      SELECT leaveid,
             leave.personid,
             leavedate,
             duration,
             leavetype,
             status,
             CONCAT(firstname, ' ', surname) AS requester,
             (status <> 'rejected') AS thisleaveyear,
             (leavedate < CURRENT_DATE) AS passed
      FROM leave
      INNER JOIN durations
      ON leave.durationid = durations.durationid
      INNER JOIN leavetypes
      ON leave.typeid = leavetypes.typeid
      INNER JOIN leavestatuses
      ON leave.statusid = leavestatuses.statusid
      INNER JOIN people
      ON leave.personid = people.personid

      WHERE status = 'pending'
      AND managerid = $1
            
      ORDER BY leaveid;
    `, [personId])
  }

  static async getLeave (personId, monday, friday) {
    return DatabaseConnection.query(`
      SELECT people.personid,
             CONCAT(firstname, ' ', surname) AS person,
             leaveid,
             leavedate,
             duration,
             status
      FROM people
      LEFT JOIN leave
        ON people.personid = leave.personid
        AND leave.leavedate >= $2
        AND leave.leavedate <= $3
      LEFT JOIN durations
        ON leave.durationid = durations.durationid
      LEFT JOIN leavestatuses
        ON leave.statusid = leavestatuses.statusid
      WHERE managerid IN (
        SELECT managerid
        FROM people
        WHERE personid = $1
      )
      AND archived = FALSE
      
      ORDER BY person, leavedate, duration;
    `, [personId, monday, friday])
  }
}

module.exports = DatabaseDashboard
