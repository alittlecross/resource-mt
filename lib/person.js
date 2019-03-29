const Database = require('../db/services/person')

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
      skills: []
    }
  }

  static buildPeopleArray (data) {
    let people = []
    data.forEach((row) => {
      people.push(this.object(row))
    })
    return people
  }

  static buildPersonObject (data) {
    let person
    data.forEach((row) => {
      if (row.kind === 'details') {
        person = this.object(row)
      } else {
        person.skills.push(row.skillid)
      }
    })
    return person
  }

  static async alreadyExists (data, extra = '') {
    let query = `WHERE ${extra} email = '${data.email}' OR ${extra} staffid = '${data.staffId}'`
    let result = await Database.getPeople(query)

    if (result.rowCount === 0) {
      return {
        status: false
      }
    } else {
      return {
        status: true,
        message: 'staff number or email already in use'
      }
    }
  }

  static async getOne (personId) {
    let query = `WHERE personid = ${personId}`
    let result = await Database.getPeopleAndSkills(query)
    return this.buildPersonObject(result.rows)
  }

  static async getEveryone () {
    let results = await Database.getPeople()
    return this.buildPeopleArray(results.rows)
  }

  static async add (data) {
    let person = await Database.addPerson(data)
    let results = await this.skills(data, person.rows[0].personid)
    return this.report(person, results)
  }

  static async update (data) {
    let person = await Database.updatePerson(data)

    await Database.deleteSkills(data.personId)

    let results = await this.skills(data, person.rows[0].personid)

    return this.report(person, results)
  }

  static async skills (data, personId) {
    let string = ''

    if (data.skills !== undefined) {
      if (!Array.isArray(data.skills)) {
        data.skills = [data.skills]
      }
      data.skills.forEach((skillId) => {
        string += `INSERT INTO personskills VALUES (${personId}, ${skillId});`
      })
      return Database.addSkills(string)
    }
  }

  static report (person, results) {
    if (Array.isArray(results)) {
      results.unshift(person)
      return results
    } else {
      return [person, results]
    }
  }
}

module.exports = Person
