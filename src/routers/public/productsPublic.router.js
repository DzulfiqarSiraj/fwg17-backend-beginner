const productPublicRouter = require('express').Router()
const productPublicController = require('../../controllers/public/productsPublic.controller')


productPublicRouter.get('/',productPublicController.getAllProducts);
productPublicRouter.get('/:id', productPublicController.getDetailProduct)

module.exports = productPublicRouter