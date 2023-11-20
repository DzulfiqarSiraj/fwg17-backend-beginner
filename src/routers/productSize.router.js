const productSizeRouter = require('express').Router()

const productSizeController = require('../controllers/productSize.controller')

productSizeRouter.get('/',productSizeController.getAllProductSize)
productSizeRouter.get('/:id',productSizeController.getDetailProductSize)
productSizeRouter.post('/',productSizeController.createProductSize)
productSizeRouter.patch('/:id',productSizeController.updateProductSize)
productSizeRouter.delete('/:id',productSizeController.deleteProductSize)

module.exports = productSizeRouter