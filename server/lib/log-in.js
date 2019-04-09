const DatabaseLogIn = require('../services/log-in')
const People = require('../lib/people')

const bcrypt = require('bcrypt')

class LogIn {
  static async authenticate (data) {
    const result = await DatabaseLogIn.getPeople(data.email)
    if (result.rowCount > 0 && data.password === undefined) {
      return {
        status: true,
        message: 'email or password incorrect'
      }
    } else if (result.rowCount > 0 && await bcrypt.compareSync(data.password, result.rows[0].password)) {
      return {
        status: true,
        user: new People(result.rows[0])
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
