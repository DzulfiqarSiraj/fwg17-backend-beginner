const productRouter = require('express').Router()


const productController = require('../../controllers/public/products.controller')


productRouter.get('/',productController.getAllProducts);
productRouter.get('/:id', productController.getDetailProduct)

module.exports = productRouter