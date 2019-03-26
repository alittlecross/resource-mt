const Database = require('../db/services/person')
const Person = require('./person')

class Manager {
  static async getTeam (data) {
    let query = `WHERE A.managerid = ${data.personId} AND A.personid != ${data.personId}`
    let results = await Database.getPeopleRolesSkills(query)
    if (results.rowCount > 0) {
      return Person.buildPersonObjects(results.rows)
    } else {
      return []
    }
  }
}

module.exports = Manager
