const DatabaseForm = require('../../services/person/form')
const Option = require('../person/form/option')

class Form {
  constructor (data) {
    this.grades = this.filterData(data, 'grade')
    this.locations = this.filterData(data, 'location')
    this.managers = this.filterData(data, 'manager')
    this.roles = this.filterData(data, 'role')
    this.statuses = this.filterData(data, 'status')
    this.skills = this.filterData(data, 'skill')
  }

  filterData (data, kind) { return data.filter(row => row.kind === kind).map(option => new Option(option)) }

  static async options () {
    const results = await DatabaseForm.getOptions()
    return new Form(results.rows)
  }
}

module.exports = Form
