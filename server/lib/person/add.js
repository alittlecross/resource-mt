const AddEdit = require('./add-edit')
const DatabaseAdd = require('../../services/person/add')

class Add {
  static async person (data) {
    const result = await DatabaseAdd.addPerson(data)
    await AddEdit.skills(data, result.rows[0].personid)
    return result
  }
}

module.exports = Add
