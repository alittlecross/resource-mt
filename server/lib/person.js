const databasePerson = require('../services/person')

class Person {
  static object (data) {
    return {
      personId: data.personid,
      staffId: data.staffid,
      firstName: data.firstname,
      surname: data.surname,
      email: data.email,
      gradeId: data.gradeid,
      locationId: data.locationid,
      managerId: data.managerid,
      role: data.role,
      statusId: data.statusid,
      skills: [],
      archived: data.archived
    }
  }

  static buildObject (data) {
    let person
    data.forEach(row => {
      if (row.kind === 'details') {
        person = this.object(row)
      } else {
        person.skills.push(row.skillid)
      }
    })
    return person
  }

  static async getPerson (personId) {
    const query = `WHERE personid = ${personId}`
    const result = await databasePerson.getPerson(query)
    return this.buildObject(result.rows)
  }
}

module.exports = Person
