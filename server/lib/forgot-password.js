const DatabaseForgotPassword = require('../services/forgot-password')
const Email = require('../lib/email')

const bcrypt = require('bcrypt')
const saltRounds = 10

class ForgotPassword {
  static async sendReset (email) {
    const hashed = await bcrypt.hashSync('ketchup', saltRounds)
    const washed = hashed.replace(/\W/g, 'i')
    await DatabaseForgotPassword.storeResetRequest(email, washed)
    const subject = 'Resource Management Tool - Reset Password'
    const html = `<div>A password reset has been requested, please click this link to <a href='${process.env.URL}/${washed}/forgot-password'>reset your password</a>.</div>` +
               `<div>Please ignore this email if you have remembered your password or did not submit this request.</div>`
    await Email.send(email, subject, html)
  }
}

module.exports = ForgotPassword
