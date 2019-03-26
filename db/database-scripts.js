const dbc = require('./database-connection')
const fs = require('fs')

class Scripts {
  static async tableExists (table) {
    let result = await dbc.query(`
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = $1
      );
    `, [table])
    return result.rows[0].exists
  }

  static async createTable (table) {
    if (!await this.tableExists(table)) {
      await dbc.query(`
        CREATE TABLE ${table} (
          id SERIAL PRIMARY KEY,
          script varchar(50),
          createdat timestamptz NOT NULL DEFAULT NOW()
        );
      `)
      if (!process.env.PKDATABASE.includes('test')) {
        console.log(`${table} 00_migrations.sql`)
      }
    }
  }

  static async scriptAlreadyRan (table, script) {
    let result = await dbc.query(`
      SELECT *
      FROM ${table}
      WHERE script = $1;
    `, [script])
    return result.rowCount === 0
  }

  static async updateTable (table, script) {
    await dbc.query(`
      INSERT INTO ${table} (script)
      VALUES ($1);
    `, [script])
  }

  static async run (type, database) {
    process.env.PKDATABASE = database
    await this.createTable(type)
    const directory = `./db/${type}/`
    let scripts = []
    fs.readdirSync(directory).forEach(file => {
      scripts.push(file)
    })
    for (let script of scripts) {
      if (await this.scriptAlreadyRan(type, script)) {
        let sql = fs.readFileSync(directory + script).toString()
        await dbc.query(sql)
        await this.updateTable(type, script)
        if (!process.env.PKDATABASE.includes('test')) {
          console.log(`${type} ${script}`)
        }
      }
    }
  }
}

module.exports = Scripts
