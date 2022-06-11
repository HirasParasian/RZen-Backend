const express = require("express") 
require("dotenv").config()
const app = express()
const cors = require('cors');

app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8081"] 
};

const httpMethods = ['get', 'post', 'put', 'patch', 'delete'];

const { APP_PORT, PORT } = process.env
app.options('*', cors(corsOptions));
app.listen(PORT || APP_PORT, () => {
  console.log(`App listening on port ${PORT || APP_PORT}`)
})

app.listen(process.env.PORT || 3000);