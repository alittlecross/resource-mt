const DatabasePeople = require('../services/people')
const People = require('../lib/people')

const bcrypt = require('bcrypt')

class LogIn {
  static async authenticate (data) {
    const query = `WHERE email = '${data.email}'`
    const result = await DatabasePeople.getPeople(query)
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
