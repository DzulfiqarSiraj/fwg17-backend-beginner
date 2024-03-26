const productsRouter = require('express').Router()

const productsController = require('../controllers/products.controller')

productsRouter.get('/',productsController.getAllProducts);
productsRouter.get('/:id', productsController.getDetailProduct)

module.exports = productsRouter