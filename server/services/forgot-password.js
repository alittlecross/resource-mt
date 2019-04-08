const DatabaseConnection = require('../../db/database-connection')

class DatabaseForgotPassword {
  static async storeResetRequest (email, hash) {
    return DatabaseConnection.query(`
      INSERT INTO resetrequests (email, hash)
      VALUES ($1, $2);
    `, [email, hash])
  }
}

module.exports = DatabaseForgotPassword
