exports.login = (req,res) => {
  const {username, password} = req.body
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