const dbc = require('../../../db/database-connection')

class Database {
  static async change (archived, personId) {
    return dbc.query(`
    UPDATE people
    SET archived = $1
    WHERE personid = $2
    `, [archived, personId])
  }
}

module.exports = Database
