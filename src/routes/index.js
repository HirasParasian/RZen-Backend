const route = require("express").Router() //ambil package express
const cors = require('cors');

route.use("/users",cors(), require("./users"))

module.exports = route