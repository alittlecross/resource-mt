const database = require('../db/services/manager')
const Person = require('./person')

class Manager {
  static async getTeam (data) {
    let results = await database.getManagedPeopleRecords(data.userId)
    if (results.rowCount > 0) {
      return Person.buildPersonObjects(results.rows)
    } else {
      return []
    }
  }
}

module.exports = Manager
