const orderDetailRouter = require('express').Router()

const orderDetailController = require('../controllers/orderDetails.controller')

orderDetailRouter.get('/', orderDetailController.getAllOrderDetails)
orderDetailRouter.get('/:id', orderDetailController.getDetailOrderDetail)
orderDetailRouter.post('/', orderDetailController.createOrderDetail)
orderDetailRouter.patch('/:id', orderDetailController.updateOrderDetail)
orderDetailRouter.delete('/:id', orderDetailController.deleteOrderDetail)


module.exports = orderDetailRouter