const Token = require("../models/Token")
const User = require("../models/User")
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

exports.register = async(req,res)=>
{
  let user = await User.findOne({email:req.body.email})
  if(user)
  {
    return res.status(400).json({error:"User already exist"})
  }
  let  newuser = new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  })
  newuser = await newuser.save()
  if(!newuser)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  let token = new Token({
    token:crypto.randomBytes(16).toString("hex"),
    user:newuser._id
  })
  token= await token.save()
  if(!token)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  let url = `http://localhost:5000/emailverify/${token.token}`
  sendEmail({
    from:"noreply@gmail.com",
    to:newuser.email,
    subject:"Email verification",
    text:`click here to verify ${url}`,
    html:`<a href=${url}>click to verify</a>`

  })
  return res.send(newuser)
} 

exports.emailverify = async(req,res)=>
{
 let token = await Token.findOne({token:req.params.id})
 if(!token)
 {
  return res.status(400).json({error:"Something went wrong"})
 } 
 let user = await User.findById(token.user)
 if(!user)
 {
  return res.status(400).json({error:"User not found"})
 }
 if(user.is_verified)
 {
  return res.status(400).json({error:"user already verified"})
 }
 user.is_verified = true
 user = await user.save()

 if(!user)
 {
  return res.status({error:"Something went wrong"})
 }
 res.send("email verified")
}
exports.resendverification = async(req,res)=>
{
  let user = await User.findOne({email:req.body.email})
  if(!user)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  let token = new Token({
    token:crypto.randomBytes(16).toString("hex"),
    user:user._id
  })
  token = await token.save()
  if(!token)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  let url = `localhost:5000/emailverify/${token.token}`
  sendEmail({
    from:"noreply@gmail.com",
    to:user.email,
    subject:"Email verification",
    text:`click here to verify ${url}`,
    html:`<a href=${url}>click to verify</a>`
  })
  res.send("resend code is sent")

}
exports.forgetPassword = async(req,res)=>
{
  let user = await User.findOne({email:req.body.email})
  if(!user)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  let token = new Token({
    token:crypto.randomBytes(16).toString("hex"),
    user:user._id
  })
  token = await token.save()
  if(!token)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  let url = `localhost:5000/resetpassword/${token.token}`
  sendEmail({
    from:"noreply@gmail.com",
    to:user.email,
    subject:"forget password",
    text:`Click here to verify ${url}`,
    html:`<a href=${url}>Click here to verify</a>`
  })
  res.send("reset password code is send")
}

exports.resetPassword = async(req,res)=>
{
  let token = await Token.findOne({token:req.params.id})
  if(!token)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  let user = await User.findById(token.user)
  if(!user)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  user.password = req.body.password
  user = await user.save()
  if(!user)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  res.send("Password is reset")

}
exports.signIn = async(req,res)=>
{
  const {email ,password}= req.body
  let user = await User.findOne({email:email})
  if(!user)
  {
    return res.status(400).json({error:"User not found"})
  }
  if(!user.authenticate(password)){
      return res.status(400).json({error:"User is not authenticated"})
  }
  if(!user.is_verified){}
  let{_id, role ,username}= user
  let token = jwt.sign({user:user._id,role:user.role},"dipesh123")
  return res.send({
    token:token,
    user:user,
    username:username,
    email:email
  })

}

exports.signOut = async(req,res ,next)=>
{
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.send("Logout Successfully");
      }

    });
  }
}