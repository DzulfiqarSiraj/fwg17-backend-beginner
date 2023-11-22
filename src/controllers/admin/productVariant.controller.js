const productVariantModel = require('../../models/productVariant.model')

exports.getAllProductVariant = async (req, res) => {
  const productVariant = await productVariantModel.findAll()
  try{
    return res.json({
      success: true,
      message: 'List All Product Variant',
      results: productVariant
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Variant Not Found'
    })
  }
}

exports.getDetailProductVariant = async (req, res) => {
  const {id} = req.params
  const productVariant = await productVariantModel.findOne(id)
  try{
    if(productVariant){
      return res.json({
        success: true,
        message: 'Detail Product Variant',
        results: productVariant
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Variant Not Found'
    })
  }
}

exports.createProductVariant = async (req, res) => {
  const productVariant = await productVariantModel.insert(req.body)
  try{
    return res.json({
      success: true,
      message: 'Create Product Variant Successfully',
      results: productVariant
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}

exports.updateProductVariant = async (req, res) => {
  try{
    const {id} = req.params
    const productVariant = await productVariantModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Product Variant Successfully',
      results: productVariant
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteProductVariant = async (req, res) => {
  try{
    const productVariant = await productVariantModel.findAll()
    const {id} = req.params
    for(let item in productVariant){
      if(String(productVariant[item]['id']) === id){
        const productvariant = await productVariantModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: productvariant
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