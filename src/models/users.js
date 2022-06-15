const { query } = require("../helpers/db")
const db = require("../helpers/db")

exports.readUsers = (data,cb) => {
  const query = db.query(`SELECT * FROM rzen_users`, (err, res) => {
    if (err) throw err
    cb(res)
  })
  console.log(query.sql)
}

exports.countUsers = (data, cb) => {
  db.query(`SELECT COUNT (*) as total FROM rzen_users`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.getUsernameAsync = (username) => new Promise((resolve, reject) => {
  db.query("select username from rzen_users where username=?", [username], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.getEmailAsync = (email) => new Promise((resolve, reject) => {
  db.query("select email from rzen_users where email=?", [email], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})

exports.createUsersAsync = (data) => new Promise((resolve, reject) => {
  db.query("INSERT INTO rzen_users SET ?", [data], (err, res) => {
    if (err) reject(err)
    resolve(res)
  })
})
