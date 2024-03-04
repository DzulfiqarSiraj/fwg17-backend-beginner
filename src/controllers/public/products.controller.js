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
  const {id} = req.params
  try{
    const products = await productModel.findCombine(id)

    const results = products.reduce((prev,curr,idx,arr)=>{
      for(keys in curr){
        if(prev[keys] === undefined){
          prev[keys] = curr[keys]
        }
        if(keys === 'sizes' || keys === 'variants'){
          if(prev[keys].length === undefined){
            prev[keys] = []
          }
          if(prev[keys].findIndex(item => item.id === curr[keys].id) === -1){
            prev[keys].push(curr[keys])
          }
        }
      }
      return prev
    },{})

    console.log(products)
    console.log(products.length)
    return res.json({
      success: true,
      message: 'Detail Product',
      results
    })
  }catch(err){
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

