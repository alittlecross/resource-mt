const DatabaseDashboard = require('../services/dashboard')
const Leave = require('../lib/leave')
const People = require('../lib/people')

class Dashboard {
  static async getRequests (personId) {
    const results = await DatabaseDashboard.getRequests(personId)
    return results.rows.map(row => new Leave(row))
  }

  static async getPeople (personId) {
    const results = await DatabaseDashboard.getPeople(personId)
    return People.buildArray(results.rows)
  }
}

module.exports = Dashboard
