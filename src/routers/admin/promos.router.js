const promosRouter = require('express').Router()

const promosController = require('../../controllers/admin/promos.controller')

promosRouter.get('/', promosController.getAllPromos)
promosRouter.get('/:id', promosController.getDetailPromo)
promosRouter.post('/', promosController.createPromo)
promosRouter.patch('/:id', promosController.updatePromo)
promosRouter.delete('/:id', promosController.deletePromo)

module.exports = promosRouter
