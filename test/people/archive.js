const Archive = require('../../server/lib/people/archive')
const DatabaseArchive = require('../../server/services/people/archive')
const Support = require('../support')

const expect = require('chai').expect

describe('class Archive', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.getPeople', () => {
    it('should get people from the database, build, and return a people array', async () => {
      sandbox.stub(DatabaseArchive, 'getPeople').returns(Support.getPeopleDouble())

      const results = await Archive.getPeople()

      expect(results.length).equal(2)
      expect(Object.keys(results[0]).length).equal(4)
      expect(results[0].firstName).equal('Dwight')
    })
  })
})
