const userModel = require('../../models/users.model')
const argon = require("argon2")
const fsPromises = require('fs/promises')
const path = require('path')
const uploadMiddleware = require('../../middlewares/upload.middleware')
const upload = uploadMiddleware('users').single('pictures')

exports.getAllUsers = async (req,res) => {
  try{
    const {keyword, page = 1, limit = 5} = req.query
  
  const count = Number(await userModel.countAll(keyword))
  const totalPage = Math.ceil(count / limit)
  const nextPage = Number(page) + 1
  const prevPage = Number(page) - 1

  if(page == 0) {
    return res.json({
      success: false,
      message: 'Bad Request'
    })
  }
  
  const users = await userModel.findAll(keyword, page, limit)
  
  if(users.length === 0) {
    return res.json({
      success: true,
      message: "Users Not Found",
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage > 0 ? prevPage : null,
        totalData: count
      },
      results: users
    })
  }

  return res.json({
    success: true,
    message: "List All Users",
    pageInfo: {
      currentPage: Number(page),
      totalPage,
      nextPage: nextPage <= totalPage ? nextPage : null,
      prevPage: prevPage > 0 ? prevPage : null,
      totalData: count
    },
    results: users
  })
  }catch(err){
    return res.json({
      success: false,
      message: 'Internal Server Error',
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
        message: 'Detail User',
        results: user
      })
    }else{
      throw Error()
    }
  }catch(err){
    return res.json({
      success: false,
      message: 'User Not Found'
    })
  }
}


exports.createUser = async(req, res) => {
  upload(req, res, async (err) => {
    try{
      if(err){
        throw err
      }

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
      if(err.message === 'File too large'){
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      if(err.message === 'extension_issue'){
        return res.status(400).json({
          success: false,
          message: 'Unsupported File Extension'
        })
      }
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })
    }
  })
}


exports.updateUser = async (req, res) => {
  upload(req, res, async (err) => {
    try{
      if(err){
        throw err
      }

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
      if(err.message === 'File too large'){
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      if(err.message === 'extension_issue'){
        return res.status(400).json({
          success: false,
          message: 'Unsupported File Extension'
        })
      }
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      })
    }
  })
}

exports.deleteUser = async (req, res) => {
  const {id} = req.params
  const users = await userModel.findOne(id)

  if(!users){
    return res.json({
      success: false,
      message: 'No Existing Data'
    })
  }

  return res.json({
    success: true,
    message: 'Delete Success',
    results: users
  })
}