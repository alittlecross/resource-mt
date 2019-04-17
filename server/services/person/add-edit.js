const DatabaseConnection = require('../../../db/database-connection')

class DatabaseAddEdit {
  static async addSkills (string) {
    return DatabaseConnection.query(`
      INSERT INTO personskills (skillid, personid)
      VALUES (${string});
    `)
  }
}

module.exports = DatabaseAddEdit
