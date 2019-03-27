const Database = require('../db/services/person')
const Person = require('./person')

class Manager {
  static async getTeam (data) {
    let query = `WHERE managerid = ${data.personId} AND personid != ${data.personId}`
    let results = await Database.getPeople(query)
    if (results.rowCount > 0) {
      return Person.buildPeopleArray(results.rows)
    } else {
      return []
    }
  }
}

module.exports = Manager
