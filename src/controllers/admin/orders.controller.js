const ordersModel = require('../../models/orders.model')
const { resFalse, resTrue, pageHandler, randNumGen } = require('../../utils/handler')

exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 5 } = req.query

    const count = Number(await ordersModel.countAll(status))

    const pagination = pageHandler(count, limit, page)

    const orders = await ordersModel.selectAll(status, page, limit)

    return resTrue(res, 'List All Orders', true, true, pagination, orders)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order')
  }
}

exports.getDetailOrder = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const order = await ordersModel.selectOne(id)

    if (!order) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Order Detail', false, true, null, order)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order')
  }
}

exports.createOrder = async (req, res) => {
  try {
    const { userId, fullName, email, promoId, grandTotal, deliveryAddress } = req.body

    const status = 'Awaiting Payment'

    if (!userId || !fullName || !email || !grandTotal || !deliveryAddress) {
      throw new Error('Undefined input')
    }

    const order = await ordersModel.insert({
      userId,
      orderNumber: randNumGen(),
      fullName,
      email,
      promoId,
      tax: 0.1,
      grandTotal,
      deliveryAddress,
      status
    })

    return resTrue(res, 'Create New Order Successfully', false, true, null, order)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order')
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existOrder = await ordersModel.selectOne(id)

    if (!existOrder) {
      throw new Error('Id is not found')
    }

    if (!req.body.status) {
      throw new Error('Undefined input')
    }

    if (req.body.status === existOrder.status) {
      throw new Error('Duplicate,status')
    }

    const order = await ordersModel.update(id, req.body)

    return resTrue(res, 'Update Order Successfully', false, true, null, order)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order')
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existOrder = await ordersModel.selectOne(id)

    if (!existOrder) {
      throw new Error('Id is not found')
    }

    const order = await ordersModel.delete(id)

    return resTrue(res, 'Delete Order Successfully', false, true, null, order)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order')
  }
}
