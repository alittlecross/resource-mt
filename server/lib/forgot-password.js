const databaseForgotPassword = require('../services/forgot-password')
const email = require('../lib/email')

class ForgotPassword {
  static async sendReset (data) {
    let hash = Math.floor(Math.random() * 1000000)
    await databaseForgotPassword.storeResetRequest(data.email, hash)
    let subject = 'Resource Management Tool - Reset Password'
    let html = `<div>A password reset has been requested, please click this link to <a href='${process.env.URL}/${hash}/forgot-password'>reset your password</a>.</div>` +
               `<div>Please ignore this email if you have remembered your password or did not submit this request.</div>`
    await email.send(data.email, subject, html)
  }
}

module.exports = ForgotPassword
