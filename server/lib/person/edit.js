const DatabaseEdit = require('../../services/person/edit')
const AddEdit = require('./add-edit')

class Edit {
  static async person (data) {
    await DatabaseEdit.updatePerson(data)
    await DatabaseEdit.deleteSkills(data.personId)
    await AddEdit.skills(data, data.personId)
  }
}

module.exports = Edit
