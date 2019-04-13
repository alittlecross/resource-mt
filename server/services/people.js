const DatabaseConnection = require('../../db/database-connection')

class DatabasePeople {
  static async getPeople () {
    return DatabaseConnection.query(`
      SELECT *
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      WHERE archived = FALSE

      ORDER BY firstname, surname;
    `)
  }
}

module.exports = DatabasePeople
