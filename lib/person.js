const Database = require('../db/services/person')

class Person {
  static object (data) {
    return {
      personId: data.personid,
      firstName: data.firstname,
      surname: data.surname
    }
  }

  static buildPeopleArray (data) {
    let people = []
    data.forEach((row) => {
      people.push(this.object(row))
    })
    return people
  }

  static async getEveryone () {
    let results = await Database.getPeople()
    return this.buildPeopleArray(results.rows)
  }

  static async alreadyExists (data) {
    let query = `WHERE email = '${data.email}' OR staffid = '${data.staffId}'`
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

  static async add (data) {
    let person = await Database.addPerson(data)

    let string = ''

    if (data.skills !== undefined) {
      if (!Array.isArray(data.skills)) {
        data.skills = [data.skills]
      }
      data.skills.forEach((skill) => {
        string += `INSERT INTO personskills VALUES (${person.rows[0].personid}, ${skill});`
      })
    }

    let results = await Database.addSkills(string)

    if (Array.isArray(results)) {
      results.unshift(person)
      return results
    } else {
      return [person, results]
    }
  }
}

module.exports = Person
