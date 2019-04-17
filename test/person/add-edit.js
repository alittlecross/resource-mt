const AddEdit = require('../../server/lib/person/add-edit')
const DatabaseAdd = require('../../server/services/person/add')
const DatabaseAddEdit = require('../../server/services/person/add-edit')
const DatabaseEdit = require('../../server/services/person/edit')
const Support = require('../support')

const expect = require('chai').expect

describe('class AddEdit', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.personExists (add)', () => {
    it(`should return false if the person doesn't exist in the database`, async () => {
      sandbox.stub(DatabaseAdd, 'getPeople').returns(Support.getPeopleDoubleZero())

      const result = await AddEdit.personExists(Support.personFormData())

      expect(result.status).equal(false)
    })

    it(`should return true if the person exists in the database`, async () => {
      sandbox.stub(DatabaseAdd, 'getPeople').returns(Support.getPeopleDouble())

      const result = await AddEdit.personExists(Support.personFormData())

      expect(result.status).equal(true)
      expect(result.message).equal('staff number or email already in use')
    })
  })

  describe('.personExists (edit)', () => {
    it(`should return false if the person doesn't exist in the database`, async () => {
      sandbox.stub(DatabaseEdit, 'getPeople').returns(Support.getPeopleDoubleZero())

      const result = await AddEdit.personExists(Support.personFormData(), true)

      expect(result.status).equal(false)
    })

    it(`should return true if the person exists in the database`, async () => {
      sandbox.stub(DatabaseEdit, 'getPeople').returns(Support.getPeopleDouble())

      const result = await AddEdit.personExists(Support.personFormData(), true)

      expect(result.status).equal(true)
      expect(result.message).equal('staff number or email already in use')
    })
  })

  describe('.skills', () => {
    it('does nothing if no skills', async () => {
      const addSkills = sandbox.stub(DatabaseAddEdit, 'addSkills')

      await AddEdit.skills({}, 1)

      expect(addSkills.callCount).equal(0)
    })

    it('should add skills to the database (one)', async () => {
      const addSkills = sandbox.stub(DatabaseAddEdit, 'addSkills')

      await AddEdit.skills({ skills: 1 }, 1)

      expect(addSkills.callCount).equal(1)
    })

    it('should add skills to the database (multi)', async () => {
      const addSkills = sandbox.stub(DatabaseAddEdit, 'addSkills')

      await AddEdit.skills({ skills: [1, 2] }, 1)

      expect(addSkills.callCount).equal(1)
    })
  })
})
