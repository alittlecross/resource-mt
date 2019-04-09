const DatabaseConnection = require('../../db/database-connection')

class DatabasePerson {
  static async getPerson (personId) {
    return DatabaseConnection.query(`
      SELECT 'details' AS kind, personid, staffid, firstname, surname, email, gradeid, locationid, managerid, role, statusid, archived, 0 AS skillid
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      WHERE personid = $1

      UNION

      SELECT 'skill' AS kind, 0 AS personid, '' AS staffid, '' AS firstname, '' AS surname, '' AS email, 0 AS gradeid, 0 AS locationid, 0 AS managerid, '' AS role, 0 AS statusid, false AS archived, skillid
      FROM personskills
      WHERE personid = $1

      ORDER BY kind, firstname, surname;
    `, [personId])
  }
}

module.exports = DatabasePerson
