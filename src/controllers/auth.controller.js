const userModel = require('../models/users.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')



exports.login = async (req,res) => {
  try{
  const {email, password} = req.body

  const user = await userModel.findOneByEmail(email)

  if(!user){
    console.log('err')
    throw Error('wrong')
  }
  
  const verify = await argon.verify(user.password,password)
  
  if(!verify){
    console.log('err')
    throw Error('wrong')
  }
  
  const payload = {
    id: user.id,
    role: user.role
  }
  const token = jwt.sign(payload, process.env.APP_SECRET || 'secretkey')

  return res.json({
    success: true,
    message: 'Login Success',
    results: {
      token: token
    }
  })

  }catch(err){
    if(err.message === 'wrong'){
      return res.status(401).json({
        success: false,
        message: "Wrong Email or Password"
      })

    }
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }

  // if(fullName === 'admin@mail.com' && password === '1234'){
  //   return res.json({
  //     success: true,
  //     message: 'Login success'
  //   })
  // }else{
  //   return res.json({
  //     success: false,
  //     message: 'Wrong username or password'
  //   })
  // }
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
    message: 'Register Successfully',
    results: data
  })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}