const dbc = require('../../../db/database-connection')

class Database {
  static async addSkills (string) {
    return dbc.query(string)
  }
}

module.exports = Database
