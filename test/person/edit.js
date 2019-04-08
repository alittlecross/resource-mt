const AddEdit = require('../../server/lib/person/add-edit')
const DatabaseEdit = require('../../server/services/person/edit')
const Edit = require('../../server/lib/person/edit')
const Support = require('../support')

const expect = require('chai').expect

describe('class Edit', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.person', () => {
    it('should update person and skills in the database', async () => {
      const updatePerson = sandbox.stub(DatabaseEdit, 'updatePerson')
      const deleteSkills = sandbox.stub(DatabaseEdit, 'deleteSkills')
      const skills = sandbox.stub(AddEdit, 'skills')

      await Edit.person(Support.personFormData())

      expect(updatePerson.callCount).equal(1)
      expect(deleteSkills.callCount).equal(1)
      expect(skills.callCount).equal(1)
    })
  })
})
