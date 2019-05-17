const DatabaseConnection = require('../../../db/database-connection')

class DatabaseArchive {
  static async change (data) {
    return DatabaseConnection.query(`
      UPDATE people
      SET archived = $1
      
      WHERE personid = $2;
    `, [data.archived, data.personId])
  }
}

module.exports = DatabaseArchive
