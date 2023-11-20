const productRouter = require('express').Router()

const productController = require('../controllers/products.controller')

productRouter.get('/',productController.getAllProducts)

module.exports = productRouter