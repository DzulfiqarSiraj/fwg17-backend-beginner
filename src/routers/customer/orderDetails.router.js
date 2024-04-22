const orderDetailsRouter = require('express').Router()

const orderDetailsController = require('../../controllers/customer/orderDetails.controller')

orderDetailsRouter.get('/', orderDetailsController.getAllOrderDetails)
orderDetailsRouter.get('/:id', orderDetailsController.getDetailOrderDetail)
orderDetailsRouter.post('/', orderDetailsController.createOrderDetail)
orderDetailsRouter.patch('/:id', orderDetailsController.updateOrderDetail)
orderDetailsRouter.delete('/:id', orderDetailsController.deleteOrderDetail)

module.exports = orderDetailsRouter
