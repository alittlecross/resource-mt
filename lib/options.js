const database = require('../db/services/options')

class Options {
  static object () {
    return {
      grades: [],
      locations: [],
      managers: [],
      roles: [],
      statuses: [],
      skills: []
    }
  }

  static buildOptionsObject (data) {
    let options = this.object()
    data.forEach((row) => {
      if (row.kind === 'grade') {
        options.grades.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'location') {
        options.locations.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'manager') {
        options.managers.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'role') {
        options.roles.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'status') {
        options.statuses.push({
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
