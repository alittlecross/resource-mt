const Database = require('../db/services/manager')
const Person = require('./person')

class Manager {
  static async getTeam (data) {
    let results = await Database.getManagedPeopleRecords(data.personId)
    if (results.rowCount > 0) {
      return Person.buildPersonObjects(results.rows)
    } else {
      return []
    }
  }
}

module.exports = Manager
