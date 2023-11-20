const messageModel = require('../models/messages.model')

exports.getAllMessages = async (req, res) => {
  try{
    const messages = await messageModel.findAll()
    return res.json({
      success: true,
      message: 'List All Messages',
      results: messages
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Messages Not Found',
    })
  }
}

exports.getDetailMessage = async(req, res) => {
  try{
    const id = Number(req.params.id)
    const message = await messageModel.findOne(id)
    if(message){
      return res.json({
        success: true,
        message: 'Detail Message',
        results: message
      })
    }else {
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'Message Not Found'
    })
  }
}

exports.createMessage = async(req, res) => {
  try{
    const message = await messageModel.insert(req.body)
    return res.json({
      success: true,
      message: "Create Message Successfully",
      result: message
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}

exports.updateMessage = async (req, res) => {
  try{
    const {id} = req.params
    const message = await messageModel.update(id, req.body)
    return res.json({
      success: true,
      message: 'Update Message Successfully',
      results: message
    })
  } catch(err){
    return res.json({
      success: false,
      message: 'Update Fail',
    })
  }
}

exports.deleteMessage = async (req,res) => {
  try{
    const messages = await messageModel.findAll()
    const {id} = req.params
    for(let item in messages){
      if(String(messages[item]['id']) === id){
        const message = await messageModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete Success',
          results: message
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