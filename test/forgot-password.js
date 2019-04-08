const DatabaseForgotPassword = require('../server/services/forgot-password')
const Email = require('../server/lib/email')
const ForgotPassword = require('../server/lib/forgot-password')

const expect = require('chai').expect

describe('class ForgotPassword', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.sendReset', () => {
    it('should send a password reset request email', async () => {
      const storeResetRequest = sandbox.stub(DatabaseForgotPassword, 'storeResetRequest')
      const send = sandbox.stub(Email, 'send')

      await ForgotPassword.sendReset({ email: 'michael.scott@scranton.com' })

      expect(storeResetRequest.callCount).equal(1)
      expect(send.callCount).equal(1)
    })
  })
})
