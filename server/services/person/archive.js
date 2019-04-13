const DatabaseConnection = require('../../../db/database-connection')

class DatabaseArchive {
  static async change (archived, personId) {
    return DatabaseConnection.query(`
    UPDATE people
    SET archived = $1
    WHERE personid = $2;
    `, [archived, personId])
  }
}

module.exports = DatabaseArchive
