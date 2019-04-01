const dbc = require('../../../db/database-connection')

class Database {
  static async password (password, hash) {
    return dbc.query(`
      UPDATE people
      SET password = $1
      FROM resetrequests
      WHERE hash = $2 AND people.email = resetrequests.email
    `, [password, hash])
  }
}

module.exports = Database
