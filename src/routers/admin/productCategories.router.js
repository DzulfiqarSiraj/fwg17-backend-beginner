const productCategoryRouter = require('express').Router()

const productCategoryController = require('../../controllers/admin/productCategories.controller')

productCategoryRouter.get('/', productCategoryController.getAllProductCategories)
productCategoryRouter.get('/:id', productCategoryController.getDetailProductCategory)
productCategoryRouter.post('/', productCategoryController.createProductCategory)
productCategoryRouter.patch('/:id', productCategoryController.updateProductCategory)
productCategoryRouter.delete('/:id', productCategoryController.deleteProductCategory)


module.exports = productCategoryRouter