const DatabaseConnection = require('./database-connection')

const fs = require('fs')

class Run {
  static async updateTable (table, script) {
    await DatabaseConnection.query(`
      INSERT INTO ${table} (script)
      VALUES ('${script}');
    `)
  }

  static async scriptAlreadyRan (table, script) {
    const result = await DatabaseConnection.query(`
      SELECT *
      FROM ${table}
      WHERE script = '${script}';
    `)
    return result.rowCount === 0
  }

  static async tableExists (table) {
    const result = await DatabaseConnection.query(`
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = '${table}'
      );
    `)
    return result.rows[0].exists
  }

  static async createTable (table) {
    if (!await Run.tableExists(table)) {
      await DatabaseConnection.query(`
        CREATE TABLE ${table} (
          id SERIAL PRIMARY KEY,
          script varchar(50),
          createdat timestamptz NOT NULL DEFAULT NOW()
        );
      `)
      console.log(`${table} 00_${table}.sql`)
    }
  }

  static async scripts (type, database) {
    process.env.PKDATABASE = database
    await Run.createTable(type)
    const directory = `./db/${type}/`
    const scripts = []
    fs.readdirSync(directory).forEach(file => {
      scripts.push(file)
    })
    for (const script of scripts) {
      if (await Run.scriptAlreadyRan(type, script)) {
        const sql = fs.readFileSync(directory + script).toString()
        await DatabaseConnection.query(sql)
        await Run.updateTable(type, script)
        console.log(`${type} ${script}`)
      }
    }
  }
}

module.exports = Run
