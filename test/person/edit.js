const addEdit = require('../../server/lib/person/add-edit')
const databaseEdit = require('../../server/services/person/edit')
const edit = require('../../server/lib/person/edit')
const support = require('../support')

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
      const updatePerson = sandbox.stub(databaseEdit, 'updatePerson')
      const deleteSkills = sandbox.stub(databaseEdit, 'deleteSkills')
      const skills = sandbox.stub(addEdit, 'skills')

      await edit.person(support.personFormData())

      expect(updatePerson.callCount).equal(1)
      expect(deleteSkills.callCount).equal(1)
      expect(skills.callCount).equal(1)
    })
  })
})
