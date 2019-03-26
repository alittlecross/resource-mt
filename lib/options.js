const database = require('../db/services/options')

class Options {
  static optionsObject () {
    return {
      roles: [],
      locations: [],
      statuses: [],
      managers: [],
      skills: []
    }
  }

  static buildOptionsObject (data) {
    let options = this.optionsObject()
    data.forEach((row) => {
      if (row.kind === 'role') {
        options.roles.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'location') {
        options.locations.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'status') {
        options.statuses.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'manager') {
        options.managers.push({
          optionId: row.optionid,
          option: row.option
        })
      } else {
        options.skills.push({
          optionId: row.optionid,
          option: row.option
        })
      }
    })
    return options
  }

  static async addPerson () {
    let results = await database.getOptions()
    return this.buildOptionsObject(results.rows)
  }
}

module.exports = Options
