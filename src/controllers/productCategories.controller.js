const productCategoryModel = require('../models/productCategories.model')

exports.getAllProductCategories = async (req,res) => {
  try{
    const productCategories = await productCategoryModel.findAll()
    return res.json({
      success: true,
      message: "List All Product Categories",
      results: productCategories
    })
  }catch(err){
    return res.json({
      success: true,
      message: "Product Categories Not Found"
    })
  }
}


exports.getDetailProductCategory = async (req,res) => {
  try{
    const id = Number(req.params.id)
    const productCategory = await productCategoryModel.findOne(id)
    if(productCategory){
      return res.json({
        success: true,
        message: 'Detail Product Category',
        results: productCategory
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Category Not Found'
    })
  }
}


exports.createProductCategory = async(req, res) => {
  try{
    const productCategory = await productCategoryModel.insert(req.body)
  
    return res.json({
    success: true,
    message: 'Create Product Category Successfully',
    results: productCategory
  })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}


exports.updateProductCategory = async (req, res) => {
  try{
    const {id} = req.params
    const productCategory = await productCategoryModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Product Category Successfully',
      results: productCategory
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteProductCategory = async (req, res) => {
  try{
    const productCategories = await productCategoryModel.findAll()
    const {id} = req.params
    for(let item in productCategories){
      if(String(productCategories[item]['id']) === id){
        const productCategory = await productCategoryModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: productCategory
        })
      }}
      return res.json({
      success: false,
      message: 'No existing data'
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Internal server error'
    })
  }
}