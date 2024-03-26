const productTagsRouter = require('express').Router()

const productTagsController = require('../../controllers/admin/productTags.controller')

productTagsRouter.get('/', productTagsController.getAllProductTags)
productTagsRouter.get('/:id', productTagsController.getDetailProductTag)
productTagsRouter.post('/', productTagsController.createProductTag)
productTagsRouter.patch('/:id', productTagsController.updateProductTag)
productTagsRouter.delete('/:id', productTagsController.deleteProductTag)


module.exports = productTagsRouter