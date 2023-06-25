const express = require("express")
const { register, emailverify, resendverification, forgetPassword, resetPassword, signIn, signOut } = require("../controllers/UserController")
const router = express.Router()

router.post("/register",register)

router.get("/emailverify/:id",emailverify)
router.post("/resendverification",resendverification)
router.post("/forgetpassword",forgetPassword)
router.post("/resetpassword/:id",resetPassword)
router.post("/signin",signIn)
router.get("/signout",signOut)

module.exports = router