// const validate = require("../helpers/validate")
const response = (res, message, results, stats = 200, pageInfo, error) => {
    let success = true
    if (stats) {
      if (stats >= 400) {
        success = false
      }
    }
  
    let data = {
      success,
      message,
      error
    }
  
    if (results) {
      data.results = results
    }
    if (pageInfo) {
      data.pageInfo = pageInfo
    }
  
  
    return res.status(stats).json(data)
  }
  
  module.exports = response