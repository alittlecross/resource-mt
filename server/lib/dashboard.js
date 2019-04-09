const DatabaseDashboard = require('../services/dashboard')
const People = require('../lib/people')

class Dashboard {
  static async getPeople (personId) {
    const results = await DatabaseDashboard.getPeople(personId)

    return People.buildArray(results.rows)
  }
}

module.exports = Dashboard
