const Archive = require('../../server/lib/person/archive')
const DatabaseArchive = require('../../server/services/person/archive')

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
      const change = sandbox.stub(DatabaseArchive, 'change')

      await Archive.person()

      expect(change.callCount).equal(1)
    })
  })
})
