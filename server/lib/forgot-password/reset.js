const bcrypt = require('bcrypt')
const databaseReset = require('../../services/forgot-password/reset')
const saltRounds = 10

class Reset {
  static async password (password, hash) {
    let hashedPassword = await bcrypt.hashSync(password, saltRounds)
    await databaseReset.password(hashedPassword, hash)
    await databaseReset.request(hash)
  }
}

module.exports = Reset
