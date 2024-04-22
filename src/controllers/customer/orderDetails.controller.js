const orderDetailsModel = require('../../models/orderDetails.model')
const { resFalse, resTrue, pageHandler } = require('../../utils/handler')

exports.getAllOrderDetails = async (req, res) => {
  try {
    const { orderId, page = 1, limit = 5 } = req.query

    const count = Number(await orderDetailsModel.countAll(orderId))

    const pagination = pageHandler(count, limit, page)

    const orderDetails = await orderDetailsModel.selectAll(orderId, page, limit)

    if (orderId && orderDetails.length === 0) {
      throw new Error('Keyword doesn\'t match')
    }

    return resTrue(res, 'List All Order Details', true, true, pagination, orderDetails)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order Detail')
  }
}

exports.getDetailOrderDetail = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const orderDetail = await orderDetailsModel.selectOne(id)

    if (!orderDetail) {
      throw new Error('Id is not found')
    }

    return resTrue(res, 'Order Detail', false, true, null, orderDetail)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order Detail')
  }
}

exports.createOrderDetail = async (req, res) => {
  try {
    const { userId, orderId, productId, productSizeId, productVariantId, quantity, subTotal } = req.body

    if (!userId || !orderId || !productId || !productSizeId || !productVariantId || !quantity || !subTotal) {
      throw new Error('Undefined input')
    }

    const orderDetail = await orderDetailsModel.insert({
      userId,
      orderId,
      productId,
      productSizeId,
      productVariantId,
      quantity,
      subTotal
    })

    return resTrue(res, 'Create New Order Successfully', false, true, null, orderDetail)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order Detail')
  }
}

exports.updateOrderDetail = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existOrderDetail = await orderDetailsModel.selectOne(id)

    if (!existOrderDetail) {
      throw new Error('Id is not found')
    }

    const orderDetail = await orderDetailsModel.update(id, req.body)

    return resTrue(res, 'Update Order Successfully', false, true, null, orderDetail)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order Detail')
  }
}

exports.deleteOrderDetail = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existOrderDetail = await orderDetailsModel.selectOne(id)

    if (!existOrderDetail) {
      throw new Error('Id is not found')
    }

    const orderDetail = await orderDetailsModel.delete(id)

    return resTrue(res, 'Delete Order Successfully', false, true, null, orderDetail)
  } catch (error) {
    console.log(error)
    return resFalse(error, res, error.message, 'Order Detail')
  }
}
