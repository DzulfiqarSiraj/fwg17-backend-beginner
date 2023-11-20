const orderModel = require('../models/orders.model')

exports.getAllOrders = async (req, res) => {
  try{
    const orders = await orderModel.findAll()
    return res.json({
      success: true,
      message: 'List all orders',
      results: orders
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Orders Not Found',
    })
  }
}

exports.getDetailOrder = async(req, res) => {
  try{
    const id = Number(req.params.id)
    const order = await orderModel.findOne(id)
    if(order){
      return res.json({
        success: true,
        message: 'Detail Order',
        results: order
      })
    }else {
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Order Not Found'
    })
  }
}

exports.createOrder = async(req, res) => {
  try{
    const order = await orderModel.insert(req.body)
    return res.json({
      success: true,
      message: "Create Order Successfully",
      result: order
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}

exports.updateOrder = async (req, res) => {
  try{
    const {id} = req.params
    const order = await orderModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Order Successfully',
      results: order
    })
  } catch(err){
    return res.json({
      success: false,
      message: 'Update Fail',
    })
  }
}

exports.deleteOrder = async (req,res) => {
  try{
    const orders = await orderModel.findAll()
    const {id} = req.params
    for(let item in orders){
      if(String(orders[item]['id']) === id){
        const order = await orderModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: order
        })
      }}
      return res.json({
      success: false,
      message: 'No existing data'
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Internal server error'
    })
  }
}