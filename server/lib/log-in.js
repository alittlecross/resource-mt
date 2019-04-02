const databasePeople = require('../services/people')
const people = require('../lib/people')
const bcrypt = require('bcrypt')

class LogIn {
  static async authenticate (data) {
    let query = `WHERE email = '${data.email}'`
    let result = await databasePeople.getPeople(query)
    if (result.rowCount > 0 && data.password === undefined) {
      return {
        status: true,
        message: 'email or password incorrect'
      }
    } else if (result.rowCount > 0 && await bcrypt.compareSync(data.password, result.rows[0].password)) {
      return {
        status: true,
        user: people.object(result.rows[0])
      }
    } else {
      return {
        status: false,
        message: 'email or password incorrect'
      }
    }
  }
}

module.exports = LogIn
