const databaseForm = require('../../services/person/form')

class Form {
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

  static buildObject (data) {
    let options = this.object()
    data.forEach((row) => {
      if (row.kind === 'grade') {
        options.grades.push({ optionId: row.optionid, option: row.option })
      } else if (row.kind === 'location') {
        options.locations.push({ optionId: row.optionid, option: row.option })
      } else if (row.kind === 'manager') {
        options.managers.push({ optionId: row.optionid, option: row.option })
      } else if (row.kind === 'role') {
        options.roles.push({ optionId: row.optionid, option: row.option })
      } else if (row.kind === 'status') {
        options.statuses.push({ optionId: row.optionid, option: row.option })
      } else {
        options.skills.push({ optionId: row.optionid, option: row.option })
      }
    })
    return options
  }

  static async options () {
    let results = await databaseForm.getOptions()
    return this.buildObject(results.rows)
  }
}

module.exports = Form
