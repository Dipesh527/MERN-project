const express = require("express")
const { addProduct, allproducts, updateProducts, deleteProduct } = require("../controllers/ProductController")
const upload = require("../utils/fileUpload")
const router = express.Router()

router.post("/addproduct", upload.single('image'),addProduct)
router.get("/products",allproducts)
router.put("/updateproducts/:id",updateProducts)
router.delete("/deleteproduct/:id",deleteProduct)

module.exports = router