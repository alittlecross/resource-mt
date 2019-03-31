const dbc = require('../db/database-connection')

class Support {
  static changeEnvironment () {
    process.env.PKDATABASE = 'ketchup_test'
  }

  static async truncateDatabase () {
    await dbc.query(`
    TRUNCATE personskills, people, statuses, skills, roles, locations, grades RESTART IDENTITY CASCADE;
    `)
  }

  static async createUsers () {
    await dbc.query(`
      INSERT INTO grades (grade)
      VALUES
        ('HEO'),
        ('EO');

      INSERT INTO roles (role)
      VALUES
        ('Resource Manager'),
        ('Assistant to the Regional Manager'),
        ('Sales Representative');

      INSERT INTO locations (location)
      VALUES
        ('Scranton');

      INSERT INTO statuses (status)
      VALUES
        ('Permanent');

      INSERT INTO skills (skill)
      VALUES
        ('People'),
        ('Farming'),
        ('Selling');

      INSERT INTO people (staffid, firstname, surname, email, password)
      VALUES
        ('MS1234', 'Michael', 'Scott', 'michael.scott@scranton.com', 'password'),
        ('DS1234', 'Dwight', 'Schrute', 'dwight.schrute@scranton.com', 'password');

      UPDATE people
      SET gradeid = grades.gradeid
      FROM grades
      WHERE people.email = 'michael.scott@scranton.com' AND grades.grade = 'HEO'
         OR people.email = 'dwight.schrute@scranton.com' AND grades.grade = 'EO';

      UPDATE people
      SET locationid = locations.locationid
      FROM locations
      WHERE people.email = 'michael.scott@scranton.com' AND locations.location = 'Scranton'
         OR people.email = 'dwight.schrute@scranton.com' AND locations.location = 'Scranton';

      UPDATE people A
      SET managerid = B.personid
      FROM people B
      WHERE A.email = 'michael.scott@scranton.com' AND B.email = 'michael.scott@scranton.com'
         OR A.email = 'dwight.schrute@scranton.com' AND B.email = 'michael.scott@scranton.com';

      UPDATE people
      SET roleid = roles.roleid
      FROM roles
      WHERE people.email = 'michael.scott@scranton.com' AND roles.role = 'Resource Manager'
         OR people.email = 'dwight.schrute@scranton.com' AND roles.role = 'Assistant to the Regional Manager';

      UPDATE people
      SET statusid = statuses.statusid
      FROM statuses
      WHERE people.email = 'michael.scott@scranton.com' AND statuses.status = 'Permanent'
         OR people.email = 'dwight.schrute@scranton.com' AND statuses.status = 'Permanent';

      INSERT INTO personskills
      SELECT people.personid, skills.skillid
      FROM people, skills
      WHERE people.email = 'michael.scott@scranton.com' AND skills.skill = 'People'
         OR people.email = 'dwight.schrute@scranton.com' AND skills.skill = 'Farming';
    `)
  }

  static getPersonDouble () {
    return {
      rowCount: 2,
      rows:
      [ { kind: 'details',
        personid: 1,
        staffid: 'MS1234',
        firstname: 'Michael',
        surname: 'Scott',
        email: 'michael.scott@scranton.com',
        gradeid: 1,
        locationid: 1,
        managerid: 1,
        role: 'Regional Manager',
        statusid: 1,
        archived: false,
        skillid: 0 },
      { kind: 'skill',
        personid: 0,
        staffid: '',
        firstname: '',
        surname: '',
        email: '',
        gradeid: 0,
        locationid: 0,
        managerid: 0,
        role: '',
        statusid: 0,
        archived: false,
        skillid: 1 } ]
    }
  }

  static getPeopleDouble () {
    return {
      rowCount: 2,
      rows:
      [ { personid: 2,
        staffid: 'DS1234',
        firstname: 'Dwight',
        surname: 'Schrute',
        email: 'dwight.schrute@scranton.com',
        password: 'password',
        gradeid: 2,
        locationid: 1,
        managerid: 1,
        roleid: 2,
        statusid: 1,
        createdat: '2019-03-31T07:57:43.487Z',
        archived: false,
        role: 'Assistant to the Regional Manager' },
      { personid: 1,
        staffid: 'MS1234',
        firstname: 'Michael',
        surname: 'Scott',
        email: 'michael.scott@scranton.com',
        password: 'password',
        gradeid: 1,
        locationid: 1,
        managerid: 1,
        roleid: 1,
        statusid: 1,
        createdat: '2019-03-31T07:57:43.487Z',
        archived: false,
        role: 'Resource Manager' } ]
    }
  }

  static getPeopleDoubleZero () {
    return {
      rowCount: 0,
      rows:
      [ ]
    }
  }

  static objectDouble () {
    return {
      personId: 2,
      firstName: 'Dwight',
      surname: 'Schrute',
      role: 'Assistant to the Regional Manager'
    }
  }

  static getOptionsDouble () {
    return {
      rowCount: 11,
      rows:
      [ { kind: 'grade', optionid: 1, option: 'HEO' },
        { kind: 'grade', optionid: 2, option: 'EO' },
        { kind: 'location', optionid: 1, option: 'Scranton' },
        { kind: 'manager', optionid: 1, option: 'Michael Scott' },
        { kind: 'role', optionid: 1, option: 'Resource Manager' },
        { kind: 'role', optionid: 2, option: 'Assistant to the Regional Manager' },
        { kind: 'role', optionid: 3, option: 'Sales Representative' },
        { kind: 'skill', optionid: 1, option: 'People' },
        { kind: 'skill', optionid: 2, option: 'Farming' },
        { kind: 'skill', optionid: 3, option: 'Selling' },
        { kind: 'status', optionid: 1, option: 'Permanent' } ]
    }
  }

  static addPersonDouble () {
    return {
      rowCount: 1,
      rows:
      [ { personid: 3 } ]
    }
  }

  static personFormData () {
    return {
      staffId: 'JH1234',
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      gradeId: '2',
      locationId: '1',
      managerId: '1',
      roleid: '1',
      statusId: '1'
    }
  }
}

module.exports = Support
