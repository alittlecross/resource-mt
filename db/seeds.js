const dbc = require('./database-connection')

class Seeds {
  static async createRoles () {
    await dbc.query(`
      INSERT INTO roles (roleid, role)
      VALUES 
        ('1', 'Apprentice Developer'),
        ('2', 'Database Analyst'),
        ('3', 'Developer'),
        ('4', 'Junior Developer'),
        ('5', 'Lead Developer'),
        ('6', 'Principal Developer'),
        ('7', 'Resource Manager'),
        ('8', 'Senior Developer'),
        ('9', 'Systems Administrator');
    `)
  }

  static async createLocations () {
    await dbc.query(`
      INSERT INTO locations
      VALUES 
        ('1', 'Bristol'),
        ('2', 'Exeter'),
        ('3', 'Newcastle'),
        ('4', 'Warrington'),
        ('5', 'York');
    `)
  }

  static async createStatuses () {
    await dbc.query(`
      INSERT INTO statuses
      VALUES
        ('1', 'Contractor'),
        ('2', 'Permanent');
    `)
  }

  static async createSkills () {
    await dbc.query(`
      INSERT INTO skills
      VALUES
        ('1', 'C#'),
        ('2', 'Java'),
        ('3', 'Node.js'),
        ('4', 'Ruby'),
        ('5', 'SQL');
    `)
  }

  static async createUsers () {
    await dbc.query(`
      INSERT INTO users
      VALUES
        ('1', 'Alan', 'Slee', 'alan.slee@defra.gov.uk', 'password', '5', '2', '1'),
        ('2', 'Nicholas', 'Blows', 'nicholas.blows@rpa.gov.uk', 'password', '5', '2', '1'),
        ('3', 'Paul', 'Doyle', 'paul.doyle@rpa.gov.uk', 'password', '5', '2', '1'),
        ('4', 'Lee', 'Gordon', 'lee.gordon@rpa.gov.uk', 'password', '3', '2', '1'),
        ('5', 'Ian', 'Noonan', 'ian.noonan@rpa.gov.uk', 'password', '5', '2', '1'),
        ('6', 'Matthew', 'Quinton', 'matthew.quinton@rpa.gov.uk', 'password', '5', '2', '1'),
        ('7', 'John', 'Watson', 'john.watson@rpa.gov.uk', 'password', '3', '2', '1'),
        ('8', 'Scott', 'Dormand', 'scott.dormand@rpa.gov.uk', 'password', '3', '2', '1'),
        ('9', 'Fay', 'Toward', 'fay.toward@rpa.gov.uk', 'password', '3', '2', '1'),
        ('10', 'Paul', 'Fazackerley', 'paul.fazackerley@rpa.gov.uk', 'password', '3', '2', '1'),
        ('11', 'Tim', 'Buttrworth', 'tim.butterworth@rpa.gov.uk', 'password', '5', '2', '1'),
        ('12', 'Marc', 'Solomon', 'marc.solomon@rpa.gov.uk', 'password', '5', '2', '1'),
        ('13', 'Jonathan', 'Drake', 'jonathan.drake@defra.gov.uk', 'password', '3', '2', '1');
    `)
  }

  static async createUserRoles () {
    await dbc.query(`
      INSERT INTO userroles
      VALUES
        ('1', '7'),
        ('2', '8'),
        ('3', '8'),
        ('4', '8'),
        ('5', '8'),
        ('6', '8'),
        ('7', '8'),
        ('8', '3'),
        ('9', '3'),
        ('10', '1'),
        ('11', '2'),
        ('12', '2'),
        ('13', '9');
    `)
  }

  static async createUserSkills () {
    await dbc.query(`
      INSERT INTO userskills
      VALUES
        ('2', '1'),
        ('2', '5'),
        ('3', '1'),
        ('3', '5'),
        ('4', '1'),
        ('4', '5'),
        ('5', '1'),
        ('5', '5'),
        ('6', '1'),
        ('6', '5'),
        ('7', '1'),
        ('7', '3'),
        ('7', '5'),
        ('8', '1'),
        ('8', '5'),
        ('9', '1'),
        ('9', '3'),
        ('9', '5'),
        ('10', '3'),
        ('10', '5'),
        ('11', '5'),
        ('12', '1'),
        ('12', '5')
    `)
  }

  static async run () {
    await this.createRoles()
    await this.createLocations()
    await this.createStatuses()
    await this.createSkills()
    await this.createUsers()
    await this.createUserRoles()
    await this.createUserSkills()
  }
}

Seeds.run()
