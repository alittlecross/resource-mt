const DatabaseConnection = require('../../db/database-connection')

class DatabaseLeave {
  static async bankHolidays (from, to) {
    return DatabaseConnection.query(`
      SELECT
        holidaydate,
        description
      FROM bankholidays
      INNER JOIN descriptions
      ON bankholidays.descriptionid = descriptions.descriptionid

      WHERE holidaydate >= $1
      AND holidaydate <= $2
      
      ORDER BY holidaydate;
    `, [from, to])
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
        (startdate < leavedate) AS thisleaveyear,
        (leavedate < CURRENT_DATE) AS passed,
        NULL AS startdate,
        NULL AS enddate,
        NULL AS allowance,
        NULL AS broughtforward,
        NULL AS total
      FROM leave
      INNER JOIN durations ON leave.durationid = durations.durationid
      INNER JOIN leavetypes ON leave.typeid = leavetypes.typeid
      INNER JOIN leavestatuses ON leave.statusid = leavestatuses.statusid
      INNER JOIN people ON leave.personid = people.personid
      LEFT JOIN leaveyear ON leave.personid = leaveyear.personid
      
      WHERE leaveyear.current = TRUE
      AND leave.personid = $1

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
        startdate,
        enddate,
        allowance,
        broughtforward,
        (broughtforward + allowance) AS total
      FROM leaveyear
      
      WHERE current = TRUE
      AND leaveyear.personid = $1

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
