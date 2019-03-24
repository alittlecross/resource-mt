const dbc = require('../db/database-connection')

class Options {
  static optionsObject () {
    return {
      roles: [],
      locations: [],
      statuses: [],
      managers: [],
      skills: []
    }
  }

  static async getOptions () {
    return dbc.query(`
      SELECT 'role' AS kind, roleid AS optionid, role AS option
      FROM roles
            
      UNION
            
      SELECT 'location' AS kind, locationid AS optionid, location AS option
      FROM locations
            
      UNION 
            
      SELECT 'status' AS kind, statusid AS optionid, status AS option
      FROM statuses
      
      UNION
            
      SELECT 'manager' AS kind, users.userid AS optionid, CONCAT( firstname, ' ', surname) AS option
      FROM users
      INNER JOIN userroles
      ON users.userid = userroles.userid
      INNER JOIN roles
      ON userroles.roleid = roles.roleid
      WHERE role = 'Manager'
                  
      UNION 
            
      SELECT 'skill' AS kind, skillid AS optionid, skill AS option
      FROM skills
      
      ORDER BY kind, option;
    `)
  }

  static buildOptionsObject (data) {
    let options = this.optionsObject()
    data.forEach((row) => {
      if (row.kind === 'role') {
        options.roles.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'location') {
        options.locations.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'status') {
        options.statuses.push({
          optionId: row.optionid,
          option: row.option
        })
      } else if (row.kind === 'manager') {
        options.managers.push({
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
    let results = await this.getOptions()
    return this.buildOptionsObject(results.rows)
  }
}

module.exports = Options
