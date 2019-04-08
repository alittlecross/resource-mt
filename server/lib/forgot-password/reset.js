const DatabaseReset = require('../../services/forgot-password/reset')

const bcrypt = require('bcrypt')
const saltRounds = 10

class Reset {
  static async password (password, hash) {
    const hashedPassword = await bcrypt.hashSync(password, saltRounds)
    await DatabaseReset.password(hashedPassword, hash)
    await DatabaseReset.request(hash)
  }
}

module.exports = Reset
