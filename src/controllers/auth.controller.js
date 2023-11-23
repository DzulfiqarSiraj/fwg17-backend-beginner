const userModel = require('../models/users.model')
exports.login = (req,res) => {
  // Deklarasi variabel username dan password melalui destructuring object yang diperoleh dari req.body
  const {username, password} = req.body

  // Membuat pengondisian jika username = string admin@gmail.com dan password = string 1234 maka respon akan mengembalikan message 'Login success' sebaliknya akan mengembalikan message 'Wrong username or password'
  if(username === 'admin@mail.com' && password === '1234'){
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
    const data = userModel.insert({
      fullName,
      email,
      password,
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