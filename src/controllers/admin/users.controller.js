const userModel = require('../../models/users.model')
const argon = require("argon2")
const fsPromises = require('fs/promises')
const path = require('path')

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
    if(req.body.password){
      req.body.password = await argon.hash(req.body.password)
    }
        
    if(req.file){
      req.body.pictures = req.file.filename
    }

    const user = await userModel.insert(req.body)

    if(req.file){
      const extension = {
        'image/png' : '.png',
        'image/jpg' : '.jpg',
        'image/jpeg' : '.jpeg',
      }

      const uploadLocation = path.join(global.path,'uploads','users')
      const fileLocation = path.join(uploadLocation, req.file.filename)
      const filename = `${user.id}${extension[req.file.mimetype]}`
      const newLocation = path.join(uploadLocation, filename)

      await fsPromises.rename(fileLocation, newLocation)
      const renamedUser = await userModel.update(user.id, {
        pictures: filename
      })
      return res.json({
        success: true,
        message: 'Create User Successfully',
        results: renamedUser
      })
    }
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
    if(req.file){
      req.body.pictures = req.file.filename
    }

    if(req.body.password){
      req.body.password = await argon.hash(req.body.password)
    }
    
    const user = await userModel.update(id, req.body)
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