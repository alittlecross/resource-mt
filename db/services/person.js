const dbc = require('../database-connection')

class Database {
  static async getAllPeopleRecords () {
    return dbc.query(`
      SELECT 'details' AS kind, A.userid, A.firstname, A.surname, A.email, A.password, '' AS role, locations.location, statuses.status, CONCAT( B.firstname, ' ', B.surname) AS manager, '' AS skill
      FROM users A
      INNER JOIN locations
      ON A.locationid = locations.locationid
      INNER JOIN statuses
      ON A.statusid = statuses.statusid
      INNER JOIN users B
      ON A.managerid = B.userid
      
      UNION

      SELECT 'role' AS kind, users.userid AS userid, '' AS firstname, '' AS surname, '' AS email, '' AS password, roles.role, '' AS location, '' AS status, '' AS manager, '' AS skill
      FROM userroles
      INNER JOIN roles
      ON userroles.roleid = roles.roleid
      INNER JOIN users
      ON userroles.userid = users.userid
      
      UNION

      SELECT 'skill' AS kind, users.userid AS userid, '' AS firstname, '' AS surname, '' AS email, '' AS password, '' AS role, '' AS location, '' AS status, '' AS manager, skills.skill
      FROM userskills
      INNER JOIN skills
      ON userskills.skillid = skills.skillid
      INNER JOIN users
      ON userskills.userid = users.userid
      
      ORDER BY kind, firstname, role, skill;
    `)
  }

  static async personAlreadyExists (email) {
    return dbc.query(`
      SELECT *
      FROM users
      WHERE email = $1
    `, [email])
  }

  static async personAdd (data) {
    return dbc.query(`
      INSERT INTO users (firstname, surname, email, locationid, statusid, managerid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING userid;
    `, [data.firstName, data.surname, data.email, data.locationId, data.statusId, data.managerId])
  }

  static async addRolesAndSkills (string) {
    return dbc.query(string)
  }
}

module.exports = Database
