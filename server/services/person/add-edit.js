const DatabaseConnection = require('../../../db/database-connection')

class DatabaseAddEdit {
  static async addSkills (string) {
    return DatabaseConnection.query(string)
  }
}

module.exports = DatabaseAddEdit
