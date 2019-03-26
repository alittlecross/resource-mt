const Database = require('../db/services/person')
const Person = require('./person')
// const bcrypt = require('bcrypt')
// const saltRounds = 10

class User {
  static async logIn (data) {
    let query = `WHERE A.email = '${data.email}'`
    let result = await Database.getPeopleRolesSkills(query)
    if (result.rowCount > 0 && data.password === result.rows[0].password) {
      return {
        status: true,
        user: Person.buildPersonObjects(result.rows)
      }
    } else if (result.rowCount > 0) {
      return {
        status: false,
        message: 'password incorrect'
      }
    } else {
      return {
        status: false,
        message: 'no account with that email'
      }
    }
  }
}

module.exports = User
