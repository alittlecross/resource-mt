const dbc = require('../database-connection')

class Database {
  static async getOptions () {
    return dbc.query(`
      SELECT 'grade' AS kind, gradeid AS optionid, grade AS option
      FROM grades

      UNION

      SELECT 'location' AS kind, locationid AS optionid, location AS option
      FROM locations

      UNION

      SELECT 'manager' AS kind, people.personid AS optionid, CONCAT( firstname, ' ', surname) AS option
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      WHERE role = 'Resource Manager'

      UNION

      SELECT 'role' AS kind, roleid AS optionid, role AS option
      FROM roles
 
      UNION

      SELECT 'status' AS kind, statusid AS optionid, status AS option
      FROM statuses

      UNION

      SELECT 'skill' AS kind, skillid AS optionid, skill AS option
      FROM skills

      ORDER BY kind, option;
    `)
  }
}

module.exports = Database
