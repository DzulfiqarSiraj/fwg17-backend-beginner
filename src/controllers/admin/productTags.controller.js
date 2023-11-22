const productTagModel = require('../../models/productTags.model')

exports.getAllProductTags = async (req,res) => {
  try{
    const productTags = await productTagModel.findAll()
    return res.json({
      success: true,
      message: "List All Product Tags",
      results: productTags
    })
  }catch(err){
    return res.json({
      success: true,
      message: "Product Tags Not Found"
    })
  }
}


exports.getDetailProductTag = async (req,res) => {
  try{
    const id = Number(req.params.id)
    const productTag = await productTagModel.findOne(id)
    if(productTag){
      return res.json({
        success: true,
        message: 'Detail Product Tag',
        results: productTag
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Tag Not Found'
    })
  }
}


exports.createProductTag = async(req, res) => {
  try{
    const productTag = await productTagModel.insert(req.body)
  
    return res.json({
    success: true,
    message: 'Create Product Tag Successfully',
    results: productTag
  })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}


exports.updateProductTag = async (req, res) => {
  try{
    const {id} = req.params
    const productTag = await productTagModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Product Tag Successfully',
      results: productTag
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteProductTag = async (req, res) => {
  try{
    const productTags = await productTagModel.findAll()
    const {id} = req.params
    for(let item in productTags){
      if(String(productTags[item]['id']) === id){
        const productTag = await productTagModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: productTag
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