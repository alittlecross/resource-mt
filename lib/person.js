const dbc = require('../db/database-connection')

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
    let user = await dbc.query(`
      INSERT INTO users (firstname, surname, email, locationid, statusid, managerid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING userid;
    `, [data.firstName, data.surname, data.email, data.locationId, data.statusId, data.managerId])

    let string = ''

    if (data.roles !== undefined) {
      if (Array.isArray(data.roles)) {
        data.roles.forEach((role) => {
          string += `INSERT INTO userroles VALUES (${user.rows[0].userid}, ${role});`
        })
      } else {
        string += `INSERT INTO userroles VALUES (${user.rows[0].userid}, ${data.roles});`
      }
    }

    if (data.skills !== undefined) {
      if (Array.isArray(data.skills)) {
        data.skills.forEach((skill) => {
          string += `INSERT INTO userskills VALUES (${user.rows[0].userid}, ${skill});`
        })
      } else {
        string += `INSERT INTO userskills VALUES (${user.rows[0].userid}, ${data.skills});`
      }
    }

    let results = await dbc.query(string)

    if (Array.isArray(results)) {
      results.unshift(user)
      return results
    } else {
      return [user, results]
    }
  }
}

module.exports = Person
