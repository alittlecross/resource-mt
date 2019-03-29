const dbc = require('../database-connection')

class Database {
  static async getPeople (where = '') {
    return dbc.query(`
      SELECT personid, firstname, surname, password, role
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid      
      ${where}

      ORDER BY firstname, surname
    `)
  }

  static async getPeopleAndSkills (where = '') {
    return dbc.query(`
      SELECT 'details' AS kind, personid, staffid, firstname, surname, email, gradeid, locationid, managerid, role, statusid, 0 AS skillid
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid 
      ${where}
      
      UNION
      
      SELECT 'skill' AS kind, 0 AS personid, '' AS staffid, '' AS firstname, '' AS surname, '' AS email, 0 AS gradeid, 0 AS locationid, 0 AS managerid, '' AS role, 0 AS statusid, skillid
      FROM personskills
      ${where}
      
      ORDER BY kind, firstname, surname;
    `)
  }

  static async addPerson (data) {
    return dbc.query(`
      INSERT INTO people (staffid, firstname, surname, email, gradeid, locationid, managerid, roleid, statusid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING personid;
    `, [data.staffId, data.firstName, data.surname, data.email, data.gradeId, data.locationId, data.managerId, data.roleId, data.statusId])
  }

  static async addSkills (string) {
    return dbc.query(string)
  }

  static async deleteSkills (personId) {
    return dbc.query(`
      DELETE FROM personskills
      WHERE personid = $1;
    `, [personId])
  }

  static async updatePerson (data) {
    return dbc.query(`
      UPDATE people
      SET
        staffid = $1,
        firstname = $2,
        surname = $3,
        email = $4,
        gradeid = $5,
        locationid = $6,
        managerid = $7,
        roleid = $8,
        statusid = $9
      WHERE personid = $10
      RETURNING personid;
    `, [data.staffId, data.firstName, data.surname, data.email, data.gradeId, data.locationId, data.managerId, data.roleId, data.statusId, data.personId])
  }
}

module.exports = Database
