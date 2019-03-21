const dbc = require('../db/database-connection')
const migrations = require('../db/database-migrations')

class Helper {
  static changeEnvironment () {
    process.env.PKDATABASE = 'ketchup_test'
  }

  static async runMigrations () {
    await migrations.run()
  }

  static async truncateDatabase () {
    await dbc.query(`
      TRUNCATE userskills, userroles, users, skills, statuses, locations, roles CASCADE;
    `)
  }

  static databaseUserOutput () {
    return {
      rowCount: 3,
      rows: [
        { kind: 'details',
          userid: 1,
          firstname: 'Michael',
          surname: 'Scott',
          email: 'michael.scott@scranton.com',
          password: 'password',
          role: '',
          location: 'scranton',
          status: 'permanent',
          manager: 'Michael Scott',
          skill: ''
        },
        { kind: 'role',
          userid: 0,
          firstname: '',
          surname: '',
          email: '',
          password: '',
          role: 'area manager',
          location: '',
          status: '',
          manager: '',
          skill: ''
        },
        { kind: 'skill',
          userid: 0,
          firstname: '',
          surname: '',
          email: '',
          password: '',
          role: '',
          location: '',
          status: '',
          manager: '',
          skill: 'node.js'
        }
      ]
    }
  }

  static async createUser () {
    await dbc.query(`
      INSERT INTO roles
      VALUES ('1', 'area manager');

      INSERT INTO locations
      VALUES ('1', 'scranton');

      INSERT INTO statuses
      VALUES ('1', 'permanent');

      INSERT INTO skills
      VALUES ('1', 'node.js');

      INSERT INTO users
      VALUES ('1', 'Michael', 'Scott', 'michael.scott@scranton.com', 'password', '1', '1', '1');

      INSERT INTO userroles
      VALUES ('1', '1');

      INSERT INTO userskills
      VALUES ('1', '1');
    `)
  }
}

module.exports = Helper
