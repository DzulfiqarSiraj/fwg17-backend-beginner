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