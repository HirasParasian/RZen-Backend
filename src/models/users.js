const { query } = require("../helpers/db")
const db = require("../helpers/db")

exports.readUsers = (data,cb) => {
  const query = db.query(`SELECT * FROM readerzen_users`, (err, res) => {
    if (err) throw err
    cb(res)
  })
  console.log(query.sql)
}

exports.countUsers = (data, cb) => {
  db.query(`SELECT COUNT (*) as total FROM readerzen_users`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}
