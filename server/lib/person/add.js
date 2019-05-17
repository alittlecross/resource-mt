const AddEdit = require('./add-edit')
const DatabaseAdd = require('../../services/person/add')

class Add {
  static async person (data) {
    const personId = await DatabaseAdd.addPerson(data)
    await AddEdit.skills(data, personId)
    return personId
  }
}

module.exports = Add
