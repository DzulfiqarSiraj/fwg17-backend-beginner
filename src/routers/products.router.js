const productRouter = require('express').Router()

const productController = require('../controllers/products.controller')

productRouter.get('/',productController.getAllProducts);
productRouter.get('/:id', productController.getDetailProduct)
productRouter.post('/',productController.createProduct)

module.exports = productRouter