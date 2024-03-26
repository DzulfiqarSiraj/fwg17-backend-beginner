const variantsRouter = require('express').Router()
const variantsController = require('../../controllers/admin/variants.controller')

variantsRouter.get('/', variantsController.getAllVariants)
variantsRouter.get('/:id', variantsController.getDetailVariant)
variantsRouter.post('/', variantsController.createVariant)
variantsRouter.patch('/:id', variantsController.updateVariant)
variantsRouter.delete('/:id', variantsController.deleteVariant)

module.exports = variantsRouter