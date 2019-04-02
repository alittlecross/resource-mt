const databasePeople = require('../services/people')

class People {
  static object (data) {
    return {
      personId: data.personid,
      firstName: data.firstname,
      surname: data.surname,
      role: data.role
    }
  }

  static buildArray (data) {
    let people = []
    data.forEach(row => {
      people.push(this.object(row))
    })
    return people
  }

  static async getPeople (query) {
    let results = await databasePeople.getPeople(query)
    return this.buildArray(results.rows)
  }
}

module.exports = People
