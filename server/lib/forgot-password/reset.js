const databaseReset = require('../../services/forgot-password/reset')

class Reset {
  static async password (password, hash) {
    await databaseReset.password(password, hash)
  }
}

module.exports = Reset
