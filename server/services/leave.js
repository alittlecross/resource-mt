const DatabaseConnection = require('../../db/database-connection')

class DatabaseLeave {
  static async bankHolidays () {
    return DatabaseConnection.query(`
      SELECT bankholidays.holidaydate, descriptions.description
      FROM bankholidays
      INNER JOIN descriptions
      ON bankholidays.descriptionid = descriptions.descriptionid;
    `)
  }

  static async submitRequest (data) {
    return DatabaseConnection.query(`
      INSERT INTO leave (leavedate, personid, typeid, durationid)
      VALUES (${data});
    `)
  }
}

module.exports = DatabaseLeave
