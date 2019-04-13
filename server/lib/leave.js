const DatabaseLeave = require('../services/leave')

class Leave {
  static async submitRequest (data) {
    const dates = (data.dates === '') ? [data.start] : data.dates.split(',')
    const joiner = `', ${data.personId}, ${data.typeId}, ${data.durationId}`
    const string = `'${dates.join(`${joiner}), ('`) + joiner}`

    DatabaseLeave.submitRequest(string)
  }
}

module.exports = Leave
