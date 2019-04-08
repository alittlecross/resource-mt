const DatabaseConnection = require('../../db/database-connection')

class DatabasePeople {
  static async getPeople (where) {
    return DatabaseConnection.query(`
      SELECT *
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      ${where}

      ORDER BY firstname, surname
    `)
  }
}

module.exports = DatabasePeople
