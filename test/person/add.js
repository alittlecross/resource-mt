const Add = require('../../server/lib/person/add')
const AddEdit = require('../../server/lib/person/add-edit')
const DatabaseAdd = require('../../server/services/person/add')
const Support = require('../support')

const expect = require('chai').expect

describe('class Add', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.person', () => {
    it('should add person and skills to the database', async () => {
      sandbox.stub(DatabaseAdd, 'addPerson').returns(Support.addPersonDouble())
      const skills = sandbox.stub(AddEdit, 'skills')

      const result = await Add.person(Support.personFormData())

      expect(skills.callCount).equal(1)
      expect(result.rowCount).equal(1)
    })
  })
})
