const sizesRouter = require('express').Router()
const sizesController = require('../../controllers/admin/sizes.controller')

sizesRouter.get('/', sizesController.getAllSizes)
sizesRouter.get('/:id', sizesController.getDetailSize)
sizesRouter.post('/', sizesController.createSize)
sizesRouter.patch('/:id', sizesController.updateSize)
sizesRouter.delete('/:id', sizesController.deleteSize)

module.exports = sizesRouter