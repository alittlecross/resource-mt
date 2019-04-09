const DatabaseConnection = require('../../db/database-connection')

class DatabaseLogIn {
  static async getPeople (email) {
    return DatabaseConnection.query(`
      SELECT *
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      WHERE email = $1

      ORDER BY firstname, surname
    `, [email])
  }
}

module.exports = DatabaseLogIn
