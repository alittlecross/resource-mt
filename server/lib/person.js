const DatabasePerson = require('../services/person')

class Person {
  constructor (data) {
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

  static buildObject (data) {
    const detailsRow = data.find(row => row.kind === 'details')
    const person = new Person(detailsRow)
    person.skills = data.filter(row => row.kind === 'skill').map(skill => skill.skillid)

    return person
  }

  static async getPerson (personId) {
    const query = `WHERE personid = ${personId}`
    const result = await DatabasePerson.getPerson(query)

    return Person.buildObject(result.rows)
  }
}

module.exports = Person
