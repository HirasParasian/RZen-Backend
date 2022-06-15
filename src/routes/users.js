const users = require("express").Router()
// const { verifyUser } = require('../helpers/auth');
const cors = require('cors');

const { readUsers,createUsers,
} = require("../controllers/users")

users.get("/",cors(), readUsers)
users.post("/",cors(), createUsers)



module.exports = users