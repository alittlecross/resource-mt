const dbc = require('../../db/database-connection')

class Helper {
  static changeEnvironment () {
    process.env.PKDATABASE = 'ketchup_test'
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
          userid: 1,
          firstname: '',
          surname: '',
          email: '',
          password: '',
          role: 'regional manager',
          location: '',
          status: '',
          manager: '',
          skill: ''
        },
        { kind: 'skill',
          userid: 1,
          firstname: '',
          surname: '',
          email: '',
          password: '',
          role: '',
          location: '',
          status: '',
          manager: '',
          skill: 'people'
        }
      ]
    }
  }

  static async createUsers () {
    await dbc.query(`
      INSERT INTO roles
      VALUES
        ('1', 'regional manager'),
        ('2', 'assistant to the regional manager');

      INSERT INTO locations
      VALUES
        ('1', 'scranton');

      INSERT INTO statuses
      VALUES
        ('1', 'permanent');

      INSERT INTO skills
      VALUES
        ('1', 'people'),
        ('2', 'farming');

      INSERT INTO users
      VALUES
        ('1', 'Michael', 'Scott', 'michael.scott@scranton.com', 'password', '1', '1', '1'),
        ('2', 'Dwight', 'Schrute', 'dwight.schrute@scranton.com', 'password', '1', '1', '1');

      INSERT INTO userroles
      VALUES
        ('1', '1'),
        ('2', '2');

      INSERT INTO userskills
      VALUES
        ('1', '1'),
        ('2', '2');
    `)
  }
}

module.exports = Helper
