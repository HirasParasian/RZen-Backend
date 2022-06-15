const route = require("express").Router() //ambil package express
const cors = require('cors');
// app.use(express.urlencoded({ extended: true }))

route.use("/users",cors(), require("./users"))

module.exports = route