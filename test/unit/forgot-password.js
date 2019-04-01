const databaseForgotPassword = require('../../server/services/forgot-password')
const email = require('../../server/lib/email')
const forgotPassword = require('../../server/lib/forgot-password')

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
      let storeResetRequest = sandbox.stub(databaseForgotPassword, 'storeResetRequest')
      let send = sandbox.stub(email, 'send')

      await forgotPassword.sendReset({ email: 'michael.scott@scranton.com' })

      expect(storeResetRequest.callCount).equal(1)
      expect(send.callCount).equal(1)
    })
  })
})
