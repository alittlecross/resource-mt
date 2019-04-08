const DatabaseArchive = require('../../services/person/archive')

class Archive {
  static async person (archived, personId) {
    await DatabaseArchive.change(archived, personId)
  }
}

module.exports = Archive
