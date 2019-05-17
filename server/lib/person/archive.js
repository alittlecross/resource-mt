const DatabaseArchive = require('../../services/person/archive')

class Archive {
  static async person (data) { return DatabaseArchive.change(data) }
}

module.exports = Archive
