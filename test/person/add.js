const add = require('../../server/lib/person/add')
const addEdit = require('../../server/lib/person/add-edit')
const databaseAdd = require('../../server/services/person/add')
const support = require('../support')

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
      sandbox.stub(databaseAdd, 'addPerson').returns(support.addPersonDouble())
      const skills = sandbox.stub(addEdit, 'skills')

      const result = await add.person(support.personFormData())

      expect(skills.callCount).equal(1)
      expect(result.rowCount).equal(1)
    })
  })
})
