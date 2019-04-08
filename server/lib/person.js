const databasePerson = require('../services/person')

class Person {
  constructor(data) {
    this.personId = data.personid
    this.staffId = data.staffid
    this.firstName = data.firstname
    this.surname = data.surname
    this.email = data.email
    this.gradeId = data.gradeid
    this.locationId = data.locationid
    this.managerId = data.managerid
    this.role = data.role
    this.statusId = data.statusid
    this.skills = []
    this.archived = data.archived
  }

  static fromRows(data) {
    const personRow = data.find(r => r.kind === 'details')
    const person = personRow ? new Person(personRow) : {}
    person.skills = data.filter(r => r.kind === 'skill').map(s => s.skillid)

    return person
  }

  static async getPerson(personId) {
    const query = `WHERE personid = ${personId}`
    const result = await databasePerson.getPerson(query)
    return Person.fromRows(result.rows)
  }
}

module.exports = Person
