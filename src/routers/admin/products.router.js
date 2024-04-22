const productsRouter = require('express').Router()

const productsController = require('../../controllers/admin/products.controller')

productsRouter.get('/', productsController.getAllProducts)
productsRouter.get('/:id', productsController.getDetailProduct)
productsRouter.post('/', productsController.createProduct)
productsRouter.patch('/:id', productsController.updateProduct)
productsRouter.delete('/:id', productsController.deleteProduct)

module.exports = productsRouter
