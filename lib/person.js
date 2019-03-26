const database = require('../db/services/person')

class Person {
  static personObject (data) {
    return {
      userId: data.userid,
      firstName: data.firstname,
      surname: data.surname,
      email: data.email,
      roles: [],
      location: data.location,
      status: data.status,
      manager: data.manager,
      skills: []
    }
  }

  static buildPersonObjects (data) {
    let people = []
    data.forEach((row) => {
      if (row.kind === 'details') {
        people.push(this.personObject(row))
      } else if (row.kind === 'role') {
        let result = people.find((x) => x.userId === row.userid)
        result.roles.push(row.role)
      } else {
        let result = people.find((x) => x.userId === row.userid)
        result.skills.push(row.skill)
      }
    })
    return people
  }

  static async add (data) {
    let user = await database.personAdd(data)

    let string = ''

    if (data.roles !== undefined) {
      if (!Array.isArray(data.roles)) {
        data.roles = [data.roles]
      }
      data.roles.forEach((role) => {
        string += `INSERT INTO userroles VALUES (${user.rows[0].userid}, ${role}); `
      })
    }

    if (data.skills !== undefined) {
      if (!Array.isArray(data.skills)) {
        data.skills = [data.skills]
      }
      data.skills.forEach((skill) => {
        string += `INSERT INTO userskills VALUES (${user.rows[0].userid}, ${skill});`
      })
    }

    let results = await database.addRolesAndSkills(string)

    if (Array.isArray(results)) {
      results.unshift(user)
      return results
    } else {
      return [user, results]
    }
  }

  static async getEveryone () {
    let results = await database.getAllPeopleRecords()
    return this.buildPersonObjects(results.rows)
  }

  static async alreadyExists (data) {
    let result = await database.personAlreadyExists(data.email)

    if (result.rowCount === 0) {
      return {
        status: false
      }
    } else {
      return {
        status: true,
        message: 'email already in use'
      }
    }
  }
}

module.exports = Person
