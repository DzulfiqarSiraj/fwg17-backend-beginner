const productModel = require('../../models/products.model')
const fsPromises = require('fs/promises')
const path = require('path')
const uploadMiddleware = require('../../middlewares/upload.middleware')
const upload = uploadMiddleware('products').single('image')


exports.getAllProducts = async (req, res) => {
  try{
    const {keyword, page = 1, limit = 5} = req.query
    
    const count = Number(await productModel.countAll(keyword))
    const totalPage = Math.ceil(count / limit)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    if(page == 0) {
      return res.json({
        success: false,
        message: 'Bad Request'
      })
    }

    const product = await productModel.findAll(keyword, page, limit)

    if(product.length === 0) {
      return res.json({
        success: true,
        message: 'Product Not Found',
        pageInfo: {
          currentPage: Number(page),
          totalPage,
          nextPage: nextPage <= totalPage ? nextPage : null,
          prevPage: prevPage > 0 ? prevPage : null,
          totalData: count
        },
        results: product
      })
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
      message: 'Internal Server Error',
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

