const productRatingModel = require('../models/productRatings.model')

exports.getAllProductRatings = async (req,res) => {
  try{
    const productRatings = await productRatingModel.findAll()
    return res.json({
      success: true,
      message: "List All Product Ratings",
      results: productRatings
    })
  }catch(err){
    return res.json({
      success: true,
      message: "Product Ratings Not Found"
    })
  }
}


exports.getDetailProductRating = async (req,res) => {
  try{
    const id = Number(req.params.id)
    const productRating = await productRatingModel.findOne(id)
    if(productRating){
      return res.json({
        success: true,
        message: 'Detail Product Rating',
        results: productRating
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Product Rating Not Found'
    })
  }
}


exports.createProductRating = async(req, res) => {
  try{
    const productRating = await productRatingModel.insert(req.body)
  
    return res.json({
    success: true,
    message: 'Create Product Rating Successfully',
    results: productRating
  })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}


exports.updateProductRating = async (req, res) => {
  try{
    const {id} = req.params
    const productRating = await productRatingModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Product Rating Successfully',
      results: productRating
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteProductRating = async (req, res) => {
  try{
    const productRatings = await productRatingModel.findAll()
    const {id} = req.params
    for(let item in productRatings){
      if(String(productRatings[item]['id']) === id){
        const productRating = await productRatingModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: productRating
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