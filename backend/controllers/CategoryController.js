const Category = require("../models/Category")

exports.addCategory = async(req,res)=>{
  let category = await Category.findOne({
    category_name: req.body.category_name
  })
  if(category)
  {
    res.status(400).json({error:"Category existed already "})
  }
  let newcategory = new Category({
    category_name:req.body.category_name
  })
  newcategory = await newcategory.save()
  if(!newcategory){
    res.status(400).json({error:"something went wrong"})
  }
  res.send(newcategory)
}
exports.getCategory = async(req,res)=>{
  let categories = await Category.find()
  if(!categories)
  {
    return  res.status(400).json({error:"Category not found "})
  }
  res.send(categories)
  
}
exports.getCategoryById = async(req,res)=>
{
  let category = await Category.findById(req.params.id)
  res.send(category)
}
exports.updateCategory = async(req,res)=>{
  let categorytoupdate = await Category.findByIdAndUpdate(req.params.id,{
    category_name:req.body.category_name
  } , {new:true})
  categorytoupdate = await categorytoupdate.save()
  res.send(categorytoupdate)
}
exports.deleteCategory = async(req, res)=>
{
  let category = await Category.findByIdAndDelete(req.params.id)
  if(!category)
  {
    res.status(400).json({error:"Categoru deleted successfully"})
  }
  res.send("category deleted successfully")
}