const addEdit = require('./add-edit')
const databaseAdd = require('../../services/person/add')

class Add {
  static async person (data) {
    const result = await databaseAdd.addPerson(data)
    await addEdit.skills(data, result.rows[0].personid)
    return result
  }
}

module.exports = Add
