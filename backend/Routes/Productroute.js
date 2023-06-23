const express = require("express")
const { addProduct, allproducts, updateProducts, deleteProduct } = require("../controllers/ProductController")
const router = express.Router()

router.post("/addproduct",addProduct)
router.get("/products",allproducts)
router.put("/updateproducts/:id",updateProducts)
router.delete("/deleteproduct/:id",deleteProduct)

module.exports = router