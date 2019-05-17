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
    this.roleId = data.roleid
    this.statusId = data.statusid
    this.skills = []
    this.archived = data.archived
  }

  static buildObject (data) {
    const person = new Person(data.find(row => row.kind === 'details'))
    person.skills = data.filter(row => row.kind === 'skill').map(skill => skill.skillid)
    return person
  }

  static async getPerson (personId) {
    const result = await DatabasePerson.getPerson(personId)
    return Person.buildObject(result.rows)
  }
}

module.exports = Person
