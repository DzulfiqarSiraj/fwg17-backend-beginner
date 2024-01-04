const productModel = require('../../models/products.model')
const fsPromises = require('fs/promises')
const path = require('path')
const uploadMiddleware = require('../../middlewares/upload.middleware')
const upload = uploadMiddleware('products').single('image')


exports.getAllProducts = async (req, res) => {
  try{
    const {search, filterBy, range, sortBy, order, page = 1, limit = 6, bestSeller} = req.query
    console.log(req.query)

    let count;
    let product;

    if(filterBy === 'basePrice'){
      count = Number(await productModel.countAllbyBasePrice(search))
    } else {
      count = Number(await productModel.countAll(search,filterBy,bestSeller))
    }

    const totalPage = Math.ceil(count / limit)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    if(filterBy === 'basePrice' || filterBy === 'id'){
      product = await productModel.findAllByIdOrBasePrice(search, filterBy, range, sortBy, order, page, limit, bestSeller)
    } else {
      product = await productModel.findAll(search, filterBy, sortBy, order, page, limit, bestSeller)
    }
      return res.json({
        success: true,
        message: 'List All Products',
        pageInfo: {
          currentPage: Number(page),
          totalPage,
          nextPage: nextPage <= totalPage ? nextPage : null,
          prevPage: prevPage > 0 ? prevPage : null,
          totalData: count
        },
        results: product
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

      if(!req.file){
        const product = await productModel.insert(req.body)
        return res.json({
          success: true,
          message: "Create Product Successfully",
          results: product
        })
      }


      if(req.file){
        req.body.image = req.file.filename
      }
  
      const product = await productModel.insert(req.body)
      return res.json({
        success: true,
        message: "Create Product Successfully",
        results: product
      })
  
      // if(req.file){
      //   const extension = {
      //     'image/png' : '.png',
      //     'image/jpg' : '.jpg',
      //     'image/jpeg' : '.jpeg',
      //   }
    
      //   const uploadLocation = path.join(global.path,'uploads','products')
      //   const fileLocation = path.join(uploadLocation,req.file.filename)
      //   const filename = `${product.id}${extension[req.file.mimetype]}`
      //   const newLocation = path.join(uploadLocation, filename)
        
      //   await fsPromises.rename(fileLocation, newLocation)
      //   const renamedProduct = await productModel.update(product.id, {
      //     image: filename
      //   })
      //   return res.json({
      //     success: true,
      //     message: "Create Product Successfully",
      //     results: renamedProduct
      //   })
      // }
  
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
  const currentData = await productModel.findOne(Number(req.params.id))
  if(!currentData){
    return res.json({
      success: false,
      message: 'No Existing Data'
    })
  }

  upload(req, res, async (err) =>{
    try{
      if(err){
        throw err
      }
      
      const {id} = req.params

      if(req.file){
        const currentFilePath = path.join(global.path,'uploads','products',currentData.image)
        console.log(currentFilePath)
        await fsPromises.rm(currentFilePath, {force: true}, (err) =>{
          if(err){
            console.log(err.message)
            return
          } else {
            console.log('File deleted successfully')
          }
        })
        req.body.image = req.file.filename
      }
      
      let product = await productModel.update(id, req.body)
      if(req.file){
        const uploadLocation = path.join(global.path,'uploads','products')
        const fileLocation = path.join(uploadLocation, req.file.filename)
        const filename = `${product.name.split(' ').join('_')}_${req.file.filename}`
        const newLocation = path.join(uploadLocation, filename)
  
        await fsPromises.rename(fileLocation, newLocation)
        product = await productModel.update(product.id, {image: filename})
      }
      return res.json({
        success: true,
        message: 'Update Product Successfully',
        results: product
      })
    } catch(err){
      if(err.message === 'File too large. Max. Upload Size 1MB'){
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      if(err.message === 'extension_issue'){
        return res.status(400).json({
          success: false,
          message: 'Unsupported File Extension. File Extension Should Be(PNG/JPG/JPEG)'
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
    const products = await productModel.findAllOrigin()
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