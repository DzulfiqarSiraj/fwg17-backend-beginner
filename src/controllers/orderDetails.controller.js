const orderDetailModel = require('../models/orderDetails.model')

exports.getAllOrderDetails = async (req,res) => {
  try{
    const orderDetails = await orderDetailModel.findAll()
    return res.json({
      success: true,
      message: "List All Order Details",
      results: orderDetails
    })
  }catch(err){
    return res.json({
      success: true,
      message: "Order Details Not Found"
    })
  }
}


exports.getDetailOrderDetail = async (req,res) => {
  try{
    const id = Number(req.params.id)
    const orderDetail = await orderDetailModel.findOne(id)
    if(orderDetail){
      return res.json({
        success: true,
        message: 'Detail Order Detail',
        results: orderDetail
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Order Detail Not Found'
    })
  }
}


exports.createOrderDetail = async(req, res) => {
  try{
    const orderDetail = await orderDetailModel.insert(req.body)
  
    return res.json({
    success: true,
    message: 'Create Order Detail Successfully',
    results: orderDetail
  })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}


exports.updateOrderDetail = async (req, res) => {
  try{
    const {id} = req.params
    const orderDetail = await orderDetailModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Order Detail Successfully',
      results: orderDetail
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteOrderDetail = async (req, res) => {
  try{
    const orderDetails = await orderDetailModel.findAll()
    const {id} = req.params
    for(let item in orderDetails){
      if(String(orderDetails[item]['id']) === id){
        const orderDetail = await orderDetailModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: orderDetail
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