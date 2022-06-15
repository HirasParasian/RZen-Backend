const usersModel = require("../models/users")
const { APP_URL } = process.env
// const validate = require("../helpers/validate")
const bcrypt = require("bcrypt")
const response = require("../helpers/response")
const responseHandler = require("../helpers/responseHandler")
// const upload = require("../helpers/upload").single("images")

const readUsers = (req, res) => {
  let { search, page, limit, userId } = req.query
  search = search || ""
  page = Number(page) || 1
  limit = Number(limit) || 5
  let offset = (page - 1) * limit
  const data = { search, limit, offset, userId }

  usersModel.readUsers(data, (results) => {
    usersModel.countUsers(data, (count) => {
      const processedResult = results.map((obj) => {
        if (obj.image !== null) {
          obj.image = `${APP_URL}/${obj.image}`
        }
        return obj
      })
      const { total } = count[0]
      const last = Math.ceil(total / limit)
      if (results.length > 0) {
        return res.status(200).json({
          success: true,
          message: "List User",
          results: processedResult,
          pageInfo: {
            prev: page > 1 ? `${APP_URL}/users?page=${page - 1}&limit=${limit}` : null,
            next: page < last ? `${APP_URL}/users?page=${page + 1}&limit=${limit}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
          }
        })
      }
      return res.status(404).json({
        success: false,
        message: "List not found"
      })
    })
  })
}

const createUsers = async (req, res) => {
  // upload(req, res, async function () {
    const {
      name, username, email, password:plainPassword
    } = req.body
    // if (req.file) {
    //   req.body.images = req.file.path
    // }
    // const salt = bcrypt.genSaltSync(10)
    // const password = bcrypt.hashSync(plainPassword, salt)
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(plainPassword, salt);
    // if (req.file) {
    //   req.body.images = req.file.path
    // }
    const result = await usersModel.getEmailAsync(email)
    if (result.length == 0) {
      const result = await usersModel.getUsernameAsync(username)
      if (result.length == 0) {
        const results = await usersModel.createUsersAsync({ name,username, email, password})
        if (results.affectedRows > 0) {
          // usersModel.searchUsers(results.insertId, (fin) => {
          //   // eslint-disable-next-line no-unused-vars
          //   const mapResults = fin.map(o => {
          //     if (o.images !== null) {
          //       o.images = `${APP_URL}/${o.images}`
          //     }
          //     return o
          //   })
            return response(res, "Register Successfully", null, 200)
          // })
        } else {
          return res.status(500).json({
            success: false,
            message: "Data Users failed to create"
          })
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Username has already used"
        })
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Email has already used"
      })
    }
  // })
}


module.exports = {
  readUsers, 
  createUsers,
  // register
}