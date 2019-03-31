const archive = require('../../../server/lib/person/archive')
const databaseArchive = require('../../../server/services/person/archive')

const expect = require('chai').expect

describe('class Archive', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.person', () => {
    it('should change the archived column in the database', async () => {
      let change = sandbox.stub(databaseArchive, 'change')

      await archive.person()

      expect(change.callCount).equal(1)
    })
  })
})
