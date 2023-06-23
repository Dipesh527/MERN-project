const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const  productSchema = new mongoose.Schema({

  product_name:{
    type:String,
    required:true
  },
  price:{
    type:Number ,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  category:{
    type:ObjectId,
    ref:"category",
    required:true
  }
},{timestamps:true})

module.exports = mongoose.model("product",productSchema)