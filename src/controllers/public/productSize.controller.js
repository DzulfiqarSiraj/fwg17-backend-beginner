const productSizeModel = require('../../models/productSize.model')

exports.getAllProductSize = async (req, res) => {
  const productSize = await productSizeModel.findAll()
  try{
    return res.json({
      success: true,
      message: 'List All Product Size',
      results: productSize
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Size Not Found'
    })
  }
}

exports.getDetailProductSize = async (req, res) => {
  const {id} = req.params
  const productSize = await productSizeModel.findOne(id)
  try{
    if(productSize){
      return res.json({
        success: true,
        message: 'Detail Product Size',
        results: productSize
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Size Not Found'
    })
  }
}

exports.createProductSize = async (req, res) => {
  const productSize = await productSizeModel.insert(req.body)
  try{
    return res.json({
      success: true,
      message: 'Create Product Size Successfully',
      results: productSize
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}

exports.updateProductSize = async (req, res) => {
  const {id} = req.params
  const productSize = await productSizeModel.update(id, req.body)
  try{
    return res.json({
      success: true,
      message: 'Update Product Size Succesfully',
      results: productSize
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteProductSize = async (req, res) => {
  try{
    const productSize = await productSizeModel.findAll()
    const {id} = req.params
    for(let item in productSize){
      if(String(productSize[item]['id']) === id){
        const productsize = await productSizeModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: productsize
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