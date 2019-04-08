const DatabaseAddEdit = require('../../services/person/add-edit')
const DatabasePeople = require('../../services/people')

class AddEdit {
  static async personExists (data, personId = '') {
    const query = `WHERE email = '${data.email}' ${personId} OR staffid = '${data.staffId}' ${personId}`
    const result = await DatabasePeople.getPeople(query)

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
