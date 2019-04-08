const DatabasePeople = require('../services/people')

class People {
  constructor (data) {
    this.personId = data.personid
    this.firstName = data.firstname
    this.surname = data.surname
    this.role = data.role
  }

  static buildArray (data) {
    const people = []
    data.forEach(row => {
      people.push(new People(row))
    })

    return people
  }

  static async getPeople (query) {
    const results = await DatabasePeople.getPeople(query)

    return this.buildArray(results.rows)
  }
}

module.exports = People
