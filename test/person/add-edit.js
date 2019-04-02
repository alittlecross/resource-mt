const addEdit = require('../../server/lib/person/add-edit')
const databaseAddEdit = require('../../server/services/person/add-edit')
const databasePeople = require('../../server/services/people')
const support = require('../support')

const expect = require('chai').expect

describe('class AddEdit', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.personExists', () => {
    it(`should return false if the person doesn't exist in the database`, async () => {
      sandbox.stub(databasePeople, 'getPeople').returns(support.getPeopleDoubleZero())

      let result = await addEdit.personExists(support.personFormData())

      expect(result.status).equal(false)
    })

    it(`should return true if the person exists in the database`, async () => {
      sandbox.stub(databasePeople, 'getPeople').returns(support.getPeopleDouble())

      let result = await addEdit.personExists(support.personFormData())

      expect(result.status).equal(true)
      expect(result.message).equal('staff number or email already in use')
    })
  })

  describe('.skills', () => {
    it('does nothing if no skills', async () => {
      let addSkills = sandbox.stub(databaseAddEdit, 'addSkills')

      await addEdit.skills({ }, 1)

      expect(addSkills.callCount).equal(0)
    })

    it('should add skills to the database (one)', async () => {
      let addSkills = sandbox.stub(databaseAddEdit, 'addSkills')

      await addEdit.skills({ skills: 1 }, 1)

      expect(addSkills.callCount).equal(1)
    })

    it('should add skills to the database (multi)', async () => {
      let addSkills = sandbox.stub(databaseAddEdit, 'addSkills')

      await addEdit.skills({ skills: [1, 2] }, 1)

      expect(addSkills.callCount).equal(1)
    })
  })
})
