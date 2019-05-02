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

  static async getLeave (personId) {
    return DatabaseConnection.query(`
      SELECT
        'request' AS type,
        leaveid,
        leave.personid,
        leavedate,
        duration,
        leavetype,
        status,
        CONCAT(firstname, ' ', surname) AS requester,
        (anniversarydate < leavedate AND status <> 'rejected' AND leavetype <> 'flexi') AS thisleaveyear,
        (leavedate < CURRENT_DATE) AS passed,
        NULL AS anniversarydate,
        NULL AS allowance,
        NULL AS broughtforward,
        NULL AS total
      FROM leave
      INNER JOIN durations ON leave.durationid = durations.durationid
      INNER JOIN leavetypes ON leave.typeid = leavetypes.typeid
      INNER JOIN leavestatuses ON leave.statusid = leavestatuses.statusid
      INNER JOIN people ON leave.personid = people.personid
      LEFT JOIN leaveanniversary ON leave.personid = leaveanniversary.personid
      WHERE leaveanniversary.current = TRUE AND leave.personid = $1

      UNION

      SELECT
        'balance' AS type,
        NULL AS leaveid,
        NULL AS personid,
        NULL AS leavedate,
        NULL AS duration,
        NULL AS leavetype,
        NULL AS status,
        NULL AS requester,
        NULL AS thisleaveyear,
        NULL AS passed,
        anniversarydate,
        allowance,
        broughtforward,
        (broughtforward + allowance) AS total
      FROM leaveanniversary
      WHERE current = TRUE AND leaveanniversary.personid = $1

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
