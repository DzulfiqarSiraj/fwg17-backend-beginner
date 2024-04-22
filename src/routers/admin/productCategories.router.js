const productCategoriesRouter = require('express').Router()

const productCategoriesController = require('../../controllers/admin/productCategories.controller')

productCategoriesRouter.get('/', productCategoriesController.getAllProductCategories)
productCategoriesRouter.get('/:id', productCategoriesController.getDetailProductCategory)
productCategoriesRouter.post('/', productCategoriesController.createProductCategory)
productCategoriesRouter.patch('/:id', productCategoriesController.updateProductCategory)
productCategoriesRouter.delete('/:id', productCategoriesController.deleteProductCategory)

module.exports = productCategoriesRouter
