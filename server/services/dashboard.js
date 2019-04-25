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
             (anniversarydate < leavedate AND status <> 'rejected' AND leavetype <> 'flexi') AS thisleaveyear,
             (leavedate < CURRENT_DATE) AS passed,
             anniversarydate,
             allowance,
             broughtforward,
             (broughtforward + allowance) AS total
      FROM leave
      INNER JOIN durations
      ON leave.durationid = durations.durationid
      INNER JOIN leavetypes
      ON leave.typeid = leavetypes.typeid
      INNER JOIN leavestatuses
      ON leave.statusid = leavestatuses.statusid
      INNER JOIN people
      ON leave.personid = people.personid
      LEFT JOIN leaveanniversary
      ON leave.personid = leaveanniversary.personid
      WHERE leaveanniversary.current = TRUE

      AND status = 'pending'
      AND managerid = $1
            
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
