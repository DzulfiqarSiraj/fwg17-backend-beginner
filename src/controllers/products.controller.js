const productsModel = require('../models/products.model')
const {resFalse, resTrue, pageHandler} = require('../utils/handler')
const uploadMiddleware = require('../middlewares/upload.middleware')
const upload = uploadMiddleware('products').single('image')
const fsPromises = require('fs/promises')
const argon = require('argon2')
const path = require('path')

exports.getAllProducts = async (req, res) => {
    try {
        const {keyword, sort = 'id', page = 1, limit=5} = req.query
  
        const count = Number(await productsModel.countAll(keyword))
  
        const pagination = pageHandler(count,limit,page)
  
        const products = await productsModel.selectAll(keyword, sort, page, limit)
  
        if(keyword && products.length === 0){
            throw new Error(`Keyword doesn't match`)
        }
  
        return resTrue(res, 'List All Products', true, true, pagination, products)
  
    } catch (error) {
		console.log(error)
        return resFalse(error, res, error.message, 'Product')
    }
};

exports.getDetailProduct = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const product = await productsModel.selectOneDetailed(id)
        
        if(!product) {
            throw new Error(`Id is not found`)
        }
  
        return resTrue(res, 'Product Detail', false, true, null, product)
  
    } catch (error) {
		console.log(error)
        return resFalse(error, res, error.message, 'Product')
    }
};