const { Pool } = require('pg')

class DatabaseConnection {
  static async query (string, argument = null) {
    let connection = new Pool({
      database: process.env.PKDATABASE,
      host: process.env.PKHOST,
      password: process.env.PKPASSWORD,
      port: process.env.PKPORT,
      user: process.env.PKUSER
    })
    let result = await connection.query(string, argument)
    await connection.end()
    return result
  }
}

module.exports = DatabaseConnection
