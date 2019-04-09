const DatabaseAdd = require('../../services/person/add')
const DatabaseAddEdit = require('../../services/person/add-edit')
const DatabaseEdit = require('../../services/person/edit')

class AddEdit {
  static async personExists (data, edit = false) {
    const result = edit ? await DatabaseEdit.getPeople(data) : await DatabaseAdd.getPeople(data)

    if (result.rowCount === 0) {
      return {
        status: false
      }
    } else {
      return {
        status: true,
        message: 'staff number or email already in use'
      }
    }
  }

  static async skills (data, personId) {
    let string = ''
    if (data.skills !== undefined) {
      if (!Array.isArray(data.skills)) {
        data.skills = [data.skills]
      }
      data.skills.forEach(skillId => {
        string += `INSERT INTO personskills VALUES (${personId}, ${skillId});`
      })
      await DatabaseAddEdit.addSkills(string)
    }
  }
}

module.exports = AddEdit
