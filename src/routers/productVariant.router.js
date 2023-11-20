const productVariantRouter = require('express').Router()

const productVariantController = require('../controllers/productVariant.controller')

productVariantRouter.get('/',productVariantController.getAllProductVariant)
productVariantRouter.get('/:id',productVariantController.getDetailProductVariant)
productVariantRouter.post('/',productVariantController.createProductVariant)
productVariantRouter.patch('/:id',productVariantController.updateProductVariant)
productVariantRouter.delete('/:id',productVariantController.deleteProductVariant)

module.exports = productVariantRouter