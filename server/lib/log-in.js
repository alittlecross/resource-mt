const DatabaseLogIn = require('../services/log-in')
const People = require('../lib/people')

const bcrypt = require('bcrypt')

class LogIn {
  static async authenticate (data) {
    const result = await DatabaseLogIn.getPeople(data.email)
    const output = {}

    if (result.rowCount > 0 && !data.password) {
      output.status = true
    } else if (result.rowCount > 0 && await bcrypt.compareSync(data.password, result.rows[0].password)) {
      output.status = true
      output.user = new People(result.rows[0])
    }

    return output
  }
}

module.exports = LogIn
