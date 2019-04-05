const { Pool } = require('pg')

class DatabaseConnection {
  static async query (string, argument = null) {
    const connection = new Pool({
      database: process.env.PKDATABASE,
      host: process.env.PKHOST,
      password: process.env.PKPASSWORD,
      port: process.env.PKPORT,
      user: process.env.PKUSER
    })
    const result = await connection.query(string, argument)
    await connection.end()
    return result
  }
}

module.exports = DatabaseConnection
