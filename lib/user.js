// const bcrypt = require('bcrypt')
const dbc = require('../db/database-connection')
// const saltRounds = 10

class User {
  static userObject (data) {
    return {
      userId: data.userid,
      firstName: data.firstname,
      surname: data.surname,
      email: data.email,
      roles: [],
      location: data.location,
      status: data.status,
      manager: data.manager,
      skills: []
    }
  }

  static async getProfile (email) {
    return dbc.query(`
      SELECT 'details' AS kind, A.userid, A.firstname, A.surname, A.email, A.password, '' AS role, locations.location, statuses.status, CONCAT( B.firstname, ' ', B.surname) manager, '' AS skill
      FROM users A
      INNER JOIN locations
      ON A.locationid = locations.locationid
      INNER JOIN statuses
      ON A.statusid = statuses.statusid
      INNER JOIN users B
      ON A.managerid = B.userid
      WHERE A.email = $1

      UNION

      SELECT 'role' AS kind, 0 AS userid, '' AS firstname, '' AS surname, '' AS email, '' AS password, roles.role, '' AS location, '' AS status, '' AS manager, '' AS skill
      FROM userroles
      INNER JOIN roles
      ON userroles.roleid = roles.roleid
      INNER JOIN users
      ON userroles.userid = users.userid
      WHERE email = $1

      UNION

      SELECT 'skill' AS kind, 0 AS userid, '' AS firstname, '' AS surname, '' AS email, '' AS password, '' AS role, '' AS location, '' AS status, '' AS manager, skills.skill
      FROM userskills
      INNER JOIN skills
      ON userskills.skillid = skills.skillid
      INNER JOIN users
      ON userskills.userid = users.userid
      WHERE email = $1

      ORDER BY kind ASC, role ASC, skill ASC;
    `, [email])
  }

  static buildUserObject (data) {
    let result
    data.forEach((row) => {
      if (row.kind === 'details') {
        result = this.userObject(row)
      } else if (row.kind === 'role') {
        result.roles.push(row.role)
      } else {
        result.skills.push(row.skill)
      }
    })
    return result
  }

  static async logIn (data) {
    let result = await this.getProfile(data.email)
    if (result.rowCount > 0 && data.password === result.rows[0].password) {
      return {
        status: true,
        user: this.buildUserObject(result.rows)
      }
    } else if (result.rowCount > 0) {
      return {
        status: false,
        message: 'password incorrect'
      }
    } else {
      return {
        status: false,
        message: 'no account with that email'
      }
    }
  }
}

module.exports = User
