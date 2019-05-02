const DatabasePeople = require('../services/people')

class People {
  constructor (data) {
    this.personId = data.personid
    this.firstName = data.firstname
    this.surname = data.surname
    this.role = data.role
  }

  static buildArray (data) {
    return data.map(row => new People(row))
  }

  static async getPeople () {
    const results = await DatabasePeople.getPeople()
    return People.buildArray(results.rows)
  }
}

module.exports = People
