const productModel = require('../models/products.model')

exports.getAllProducts = async (req, res) => {
  try{
    const products = await productModel.findAll()
    return res.json({
      success: true,
      message: 'List all products',
      results: products
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Products Not Found',
    })
  }
}

exports.getDetailProduct = async(req, res) => {
  try{
    const id = Number(req.params.id)
    const product = await productModel.findOne(id)
    if(product){
      return res.json({
        success: true,
        message: 'Detail Product',
        results: product
      })
    }else {
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Not Found'
    })
  }
}

exports.createProduct = async(req, res) => {
  try{
    const product = await productModel.insert(req.body)
    return res.json({
      success: true,
      message: "Create Product Successfully",
      result: product
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}

exports.updateProduct = async (req, res) => {
  try{
    const {id} = req.params
    const product = await productModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Product Successfully',
      results: product
    })
  } catch(err){
    return res.json({
      success: false,
      message: 'Update Fail',
    })
  }
}

exports.deleteProduct = async (req,res) => {
  try{
    const products = await productModel.findAll()
    const {id} = req.params
    for(let item in products){
      if(String(products[item]['id']) === id){
        const product = await productModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: product
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