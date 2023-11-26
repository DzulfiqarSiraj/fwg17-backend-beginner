const userModel = require('../../models/users.model')

const argon = require("argon2")

exports.getAllUsers = async (req,res) => {
  try{
    const users = await userModel.findAll()
    return res.json({
      success: true,
      message: "List all users",
      results: users
    })
  }catch(err){
    return res.json({
      success: true,
      message: "Users Not Found"
    })
  }
}


exports.getDetailUser = async (req,res) => {
  try{
    const id = Number(req.params.id)
    const user = await userModel.findOne(id)
    if(user){
      return res.json({
        success: true,
        message: 'Detail user',
        results: user
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'User not found'
    })
  }
}


exports.createUser = async(req, res) => {
  try{
    const data = {
      ...req.body,
    }
    
    if(data.password){
      data.password = await argon.hash(data.password)
    }
    
    if(req.file){
      data.pictures = req.file.filename
    }
    const user = await userModel.insert(data)
    console.log(data)
  
    return res.json({
    success: true,
    message: 'Create User Successfully',
    results: user
  })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}


exports.updateUser = async (req, res) => {
  try{
    const {id} = req.params

    const data = {
      ...req.body,
    }

    if(req.file){
      data.pictures = req.file.filename
    }

    if(req.body.password){
      data.password = await argon.hash(req.body.password)
    }
    user = await userModel.update(id, data)
    return res.json({
      success: true,
      message: 'Update User Successfully',
      results: user
    })
  }catch(err){
    return res.json({
      success: false,
      message: 'Update Fail'
    })
  }
}

exports.deleteUser = async (req, res) => {
  try{
    const users = await userModel.findAll()
    const {id} = req.params
    for(let item in users){
      if(String(users[item]['id']) === id){
        const user = await userModel.delete(id)
        return res.json({
          success: true,
          message: 'Delete success',
          results: user
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