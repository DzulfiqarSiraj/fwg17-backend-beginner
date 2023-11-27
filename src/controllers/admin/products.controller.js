const productModel = require('../../models/products.model')
const fsPromises = require('fs/promises')
const path = require('path')
const uploadMiddleware = require('../../middlewares/upload.middleware')
const upload = uploadMiddleware('products').single('image')


exports.getAllProducts = async (req, res) => {
  try{
    const products = await productModel.findAll()
    return res.json({
      success: true,
      message: 'List All Products',
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
  upload(req, res, async (err)=>{
    try{
      if(err){
        throw err
      }

      if(req.file){
        req.body.image = req.file.filename
      }
  
      const product = await productModel.insert(req.body)
  
      if(req.file){
        const extension = {
          'image/png' : '.png',
          'image/jpg' : '.jpg',
          'image/jpeg' : '.jpeg',
        }
    
        const uploadLocation = path.join(global.path,'uploads','products')
        const fileLocation = path.join(uploadLocation,req.file.filename)
        const filename = `${product.id}${extension[req.file.mimetype]}`
        const newLocation = path.join(uploadLocation, filename)
        
        await fsPromises.rename(fileLocation, newLocation)
        const renamedProduct = await productModel.update(product.id, {
          image: filename
        })
        return res.json({
          success: true,
          message: "Create Product Successfully",
          result: renamedProduct
        })
      }
  
    }catch(err){
      if(err.message === 'File too large'){
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      if(err.message === 'extension_issue'){
        return res.status(400).json({
          success: false,
          message: 'Unsupported File Extension'
        })
      }
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })
    }
  })
}

exports.updateProduct = async (req, res) => {
  upload(req, res, async (err) =>{
    try{
      if(err){
        throw err
      }

      const {id} = req.params
      if(req.file){
        req.body.image = req.file.filename
      }
      const product = await productModel.update(id, req.body)
      return res.json({
        success: true,
        message: 'Update Product Successfully',
        results: product
      })
    } catch(err){
      if(err.message === 'File too large'){
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      if(err.message === 'extension_issue'){
        return res.status(400).json({
          success: false,
          message: 'Unsupported File Extension'
        })
      }
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })
    }
  })
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