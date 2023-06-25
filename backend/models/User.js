const mongoose = require("mongoose")
const uuidv1 = require("uuidv1")
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  hashed_password:{
    type:String,
    required:true
  },
  salt:String,
  role:{
    type:Boolean,
    default:false
  },
  is_verified:{
    type:Boolean,
    default:false
  }
} ,{timestamps:true})

userSchema.virtual("password")
.set(function(password)
{
  // // create a temporary variable call password
  // this._password = this.password,
  // generate a timestamp
  this.salt= uuidv1(),
  // encryptpassword
  this.hashed_password = this.encrpt(password)
})

userSchema.methods = {
  encrpt:function(password)
  {
    if(password== "")
    {
      return ""
    }
    try {
      return this.hashed_password= crypto
          .createHmac("sha256", this.salt)
          .update(password)
          .digest("hex");
  } catch (err) {
      return "";
  }
  },
  authenticate:function(password)
  {
    return this.hashed_password=== this.encrpt(password)
  }
}

module.exports = mongoose.model("user", userSchema)