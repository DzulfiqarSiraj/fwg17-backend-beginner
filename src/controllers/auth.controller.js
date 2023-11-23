const userModel = require('../models/users.model')

const argon = require('argon2')


exports.login = async (req,res) => {
  const {fullName, password} = req.body
  
  if(fullName === 'admin@mail.com' && password === '1234'){
    return res.json({
      success: true,
      message: 'Login success'
    })
  }else{
    return res.json({
      success: false,
      message: 'Wrong username or password'
    })
  }
}

exports.register = async (req, res) => {
  try{
    const {fullName, email, password, address, phoneNumber} = req.body

    const hashed = await argon.hash(password)

    const data = userModel.insert({
      fullName,
      email,
      password: hashed,
      address,
      phoneNumber
  })
  return res.json({
    success: true,
    message: 'Register Successfully'
  })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}