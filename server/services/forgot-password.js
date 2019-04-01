const dbc = require('../../db/database-connection')

class Database {
  static async storeResetRequest (email, hash) {
    return dbc.query(`
      INSERT INTO resetrequests (email, hash)
      VALUES ($1, $2);
    `, [email, hash])
  }
}

module.exports = Database
