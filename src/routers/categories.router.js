const categoryRouter = require('express').Router()

const categoryController = require('../controllers/categories.controller')

categoryRouter.get('/',categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getDetailCategory)
categoryRouter.post('/',categoryController.createCategory);
categoryRouter.patch('/:id',categoryController.updateCategory);
categoryRouter.delete('/:id',categoryController.deleteCategory);

module.exports = categoryRouter