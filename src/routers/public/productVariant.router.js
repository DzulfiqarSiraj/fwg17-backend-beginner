const productVariantRouter = require('express').Router()

const productVariantController = require('../../controllers/public/productVariant.controller')

productVariantRouter.get('/',productVariantController.getAllProductVariant)
productVariantRouter.get('/:id',productVariantController.getDetailProductVariant)

module.exports = productVariantRouter