const ordersRouter = require('express').Router()

const ordersController = require('../../controllers/customer/orders.controller')

// ordersRouter.get('/',ordersController.getAllOrders);
// ordersRouter.get('/:id', ordersController.getDetailOrder)
ordersRouter.post('/',ordersController.createOrder);
// ordersRouter.patch('/:id',ordersController.updateOrder);
// ordersRouter.delete('/:id',ordersController.deleteOrder);

module.exports = ordersRouter