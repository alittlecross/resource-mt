const databaseEdit = require('../../services/person/edit')
const addEdit = require('./add-edit')

class Edit {
  static async person (data) {
    await databaseEdit.updatePerson(data)
    await databaseEdit.deleteSkills(data)
    await addEdit.skills(data, data.personId)
  }
}

module.exports = Edit
