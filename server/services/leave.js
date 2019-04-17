const DatabaseConnection = require('../../db/database-connection')

class DatabaseLeave {
  static async bankHolidays () {
    return DatabaseConnection.query(`
      SELECT holidaydate, description
      FROM bankholidays
      INNER JOIN descriptions
      ON bankholidays.descriptionid = descriptions.descriptionid
      
      ORDER BY holidaydate;
    `)
  }

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
      WHERE leave.personid = $1
      
      ORDER BY leavedate DESC;
    `, [personId])
  }

  static async submitRequest (string) {
    return DatabaseConnection.query(`
      INSERT INTO leave (leavedate, personid, typeid, durationid, statusid)
      VALUES (${string});
    `)
  }
}

module.exports = DatabaseLeave
