const express = require('express')
const app = express()
const bodyparser = require("body-parser")
require('dotenv').config()
require("./connection")
port = process.env.PORT
app.use(bodyparser.json())

const category = require("./Routes/CategoryRoutes")
const product = require("./Routes/Productroute")
const user = require("./Routes/UserRoutes")

app.use("",category)
app.use("",product)
app.use("",user)
app.listen(port,()=>{
  console.log(`Server started at ${port} `)
})