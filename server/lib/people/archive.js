const DatabaseArchive = require('../../services/people/archive')
const People = require('../../lib/people')

class Archive {
  static async getPeople () {
    const results = await DatabaseArchive.getPeople()
    return People.buildArray(results.rows)
  }
}

module.exports = Archive
