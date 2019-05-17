const DatabaseConnection = require('../../../db/database-connection')

class DatabaseArchive {
  static async getPeople () {
    return DatabaseConnection.query(`
      SELECT *
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      
      WHERE archived = TRUE

      ORDER BY firstname, surname;
    `)
  }
}

module.exports = DatabaseArchive
