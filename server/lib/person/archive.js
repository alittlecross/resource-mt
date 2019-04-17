const DatabaseArchive = require('../../services/person/archive')

class Archive {
  static async person (data) {
    await DatabaseArchive.change(data)
  }
}

module.exports = Archive
