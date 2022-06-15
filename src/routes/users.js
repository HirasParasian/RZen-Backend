const users = require("express").Router()
// const { verifyUser } = require('../helpers/auth');
const cors = require('cors');

const { readUsers,
} = require("../controllers/users")

users.get("/",cors(), readUsers)



module.exports = users