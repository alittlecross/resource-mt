const DatabaseConnection = require('../../db/database-connection')

class DatabaseDashboard {
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
