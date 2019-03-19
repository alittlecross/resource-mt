const { Pool } = require('pg')

class DatabaseConnection {
  static async query (string, argument = null) {
    let connection = new Pool({
      user: process.env.PKUSER,
      password: process.env.PKPASSWORD,
      host: process.env.PKHOST,
      database: process.env.PKDATABASE,
      port: process.env.PKPORT
    })
    let result = await connection.query(string, argument)
    await connection.end()
    return result
  }
}

module.exports = DatabaseConnection
