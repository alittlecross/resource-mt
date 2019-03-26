// const Browser = require('zombie')
// const Helper = require('../support')

// const app = require('../../app')
// const http = require('http')

// http.createServer(app)

// describe('User logs out', () => {
//   const browser = new Browser({ site: 'http://localhost:3000' })

//   before(async () => {
//     await Helper.changeEnvironment()
//     await Helper.truncateDatabase()
//     await Helper.createUsers()
//   })

//   describe('...by clicking the log out link', () => {
//     it('user should return to the log in screen', async () => {
//       await browser.visit('/')
//       await browser.fill('email', 'michael.scott@scranton.com')
//       await browser.fill('password', 'password')
//       await browser.pressButton('log in')
//       await browser.clickLink('log out')

//       browser.assert.url('http://localhost:3000')
//     })
//   })
// })
