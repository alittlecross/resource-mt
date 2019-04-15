const DatabaseConnection = require('../../db/database-connection')

class DatabaseLeave {
  static async bankHolidays () {
    return DatabaseConnection.query(`
      SELECT holidaydate, description
      FROM bankholidays
      INNER JOIN descriptions
      ON bankholidays.descriptionid = descriptions.descriptionid
      
      ORDER BY holidaydate;
    `)
  }

  static async getRequest (data) {
    return DatabaseConnection.query(`
      SELECT *
      FROM leave
      WHERE personid = $1;
    `, [data.personId])
  }

  static async submitRequest (data) {
    return DatabaseConnection.query(`
      INSERT INTO leave (leavedate, personid, typeid, durationid)
      VALUES (${data});
    `)
  }
}

module.exports = DatabaseLeave
