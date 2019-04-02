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

  static async request (hash) {
    return dbc.query(`
      DELETE FROM resetrequests
      WHERE email IN 
        ( SELECT email
          FROM resetrequests
          WHERE hash = $1 );
    `, [hash])
  }
}

module.exports = Database
