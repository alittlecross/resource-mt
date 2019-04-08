const DatabaseForm = require('../../services/person/form')

class Form {
  constructor () {
    this.grades = []
    this.locations = []
    this.managers = []
    this.roles = []
    this.statuses = []
    this.skills = []
  }

  static buildObject (data) {
    const options = new Form()
    options.grades = data.filter(row => row.kind === 'grade').map(option => {
      this.optionId = option.optionid
      this.option = option.option
    })
    options.locations = data.filter(row => row.kind === 'location').map(option => {
      this.optionId = option.optionid
      this.option = option.option
    })
    options.managers = data.filter(row => row.kind === 'manager').map(option => {
      this.optionId = option.optionid
      this.option = option.option
    })
    options.roles = data.filter(row => row.kind === 'role').map(option => {
      this.optionId = option.optionid
      this.option = option.option
    })
    options.statuses = data.filter(row => row.kind === 'status').map(option => {
      this.optionId = option.optionid
      this.option = option.option
    })
    options.skills = data.filter(row => row.kind === 'skill').map(option => {
      this.optionId = option.optionid
      this.option = option.option
    })

    return options
  }

  static async options () {
    const results = await DatabaseForm.getOptions()
    return this.buildObject(results.rows)
  }
}

module.exports = Form
