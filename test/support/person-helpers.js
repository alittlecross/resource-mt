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
          location: 'Scranton',
          status: 'Permanent',
          manager: 'Michael Scott',
          skill: ''
        },
        { kind: 'role',
          userid: 1,
          firstname: '',
          surname: '',
          email: '',
          password: '',
          role: 'Regional Manager',
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
          skill: 'People'
        }
      ]
    }
  }

  static async createUsers () {
    await dbc.query(`
      INSERT INTO roles
      VALUES
        ('1', 'Regional Manager'),
        ('2', 'Assistant to the Regional Manager');

      INSERT INTO locations
      VALUES
        ('1', 'Scranton');

      INSERT INTO statuses
      VALUES
        ('1', 'Permanent');

      INSERT INTO skills
      VALUES
        ('1', 'People'),
        ('2', 'Farming');

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

  static peopleArrayDouble () {
    return [{
      userId: 3,
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      roles: [ 'Sales Representative' ],
      location: 'Scranton',
      status: 'Permanent',
      manager: 'Michael Scott',
      skills: [ 'Farming' ]
    }]
  }
}

module.exports = Helper
