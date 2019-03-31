const dbc = require('../../db/database-connection')

class Database {
  static async getPeople (where) {
    return dbc.query(`
      SELECT *
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      ${where}

      ORDER BY firstname, surname
    `)
  }
}

module.exports = Database
