const Product = require("../models/Product")

exports.addProduct = async(req,res)=>{
  let addproduct = new Product({
    product_name:req.body.product_name,
    price:req.body.price,
    image:req.file.path,
    description:req.body.description,
    category:req.body.category
  })
  addproduct = await addproduct.save()
  if(!addproduct){
    return res.status(400).json({error:"Something went wrong"})
  }
  res.send(addproduct)
}
exports.allproducts = async(req,res)=>
{
  let products =  await Product.find()
  if(!products)
  {
    res.status(400).json({error:"Something went wrong"})
  }
  res.send(products)
}

exports.updateProducts = async(req,res)=>
{
  let updateproduct =  await Product.findByIdAndUpdate(req.params.id,{
    product_name:req.body.product_name,
    price:req.body.price,
    image:req.body.image,
    description:req.body.description,
    category:req.body.category
  },{new:true})
  updateproduct = await updateproduct.save()
  if(!updateproduct)
  {
    res.status(400).json("Something went wrong")
  }
  res.send(updateproduct)
}
exports.deleteProduct = async(req,res)=>
{
  let product = await Product.findByIdAndDelete(req.params.id)
  if(!product)
  {
    res.status(400).json({
      error:"something went wrong"
    })
  }
  res.send("Product deleted successfully")
}