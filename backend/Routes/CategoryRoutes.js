const express= require('express')
const { addCategory, getCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/CategoryController')
const { deleteMany } = require('../models/Category')
const router = express.Router()

router.post("/addcategory",addCategory)
router.get("/categories",getCategory)
router.get("/category/:id",getCategoryById)
router.put("/updatecatgory/:id",updateCategory)
router.delete("/deletecategory/:id",deleteCategory)

module.exports= router