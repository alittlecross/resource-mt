const databasePeople = require('../services/people')
const people = require('../lib/people')
// const bcrypt = require('bcrypt')
// const saltRounds = 10

class LogIn {
  static async authenticate (data) {
    let query = `WHERE email = '${data.email}'`
    let result = await databasePeople.getPeople(query)
    if (result.rowCount > 0 && data.password === result.rows[0].password) {
      return {
        status: true,
        user: people.object(result.rows[0])
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

module.exports = LogIn
