const DatabaseConnection = require('../../db/database-connection')

class DatabasePerson {
  static async getPerson (where) {
    return DatabaseConnection.query(`
      SELECT 'details' AS kind, personid, staffid, firstname, surname, email, gradeid, locationid, managerid, role, statusid, archived, 0 AS skillid
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      ${where}

      UNION

      SELECT 'skill' AS kind, 0 AS personid, '' AS staffid, '' AS firstname, '' AS surname, '' AS email, 0 AS gradeid, 0 AS locationid, 0 AS managerid, '' AS role, 0 AS statusid, false AS archived, skillid
      FROM personskills
      ${where}

      ORDER BY kind, firstname, surname;
    `)
  }
}

module.exports = DatabasePerson
