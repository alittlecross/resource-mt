const databaseArchive = require('../../services/person/archive')

class Archive {
  static async person (archived, personId) {
    await databaseArchive.change(archived, personId)
  }
}

module.exports = Archive
