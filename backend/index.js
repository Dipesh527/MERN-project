const express = require('express')
const app = express()
const bodyparser = require("body-parser")
require('dotenv').config()
require("./connection")
port = process.env.PORT
app.use(bodyparser.json())

const category = require("./Routes/CategoryRoutes")
const product = require("./Routes/Productroute")

app.use("",category)
app.use("",product)
app.listen(port,()=>{
  console.log(`Server started at ${port} `)
})