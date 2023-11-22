const productTagRouter = require('express').Router()

const productTagController = require('../../controllers/admin/productTags.controller')

productTagRouter.get('/', productTagController.getAllProductTags)
productTagRouter.get('/:id', productTagController.getDetailProductTag)
productTagRouter.post('/', productTagController.createProductTag)
productTagRouter.patch('/:id', productTagController.updateProductTag)
productTagRouter.delete('/:id', productTagController.deleteProductTag)


module.exports = productTagRouter