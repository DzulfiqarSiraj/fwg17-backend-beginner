const productSizeRouter = require('express').Router()

const productSizeController = require('../../controllers/public/productSize.controller')

productSizeRouter.get('/',productSizeController.getAllProductSize)
productSizeRouter.get('/:id',productSizeController.getDetailProductSize)


module.exports = productSizeRouter