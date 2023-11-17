// Deklarasi variabel users untuk yang berisi data Array of Object
let users = [
  {
    id: 1,
    name: 'John Hopkins Jr.'
  },
  {
    id: 2,
    name: 'Jean Doe'
  }
]

// Deklarasi variabel countUser yang berisi data number dari panjang variabel users yang akan dimanfaatkan untuk melakukan increment pada saat membuat data baru dengan fungsi createUser
let countUser = users.length

const userModel = require('../models/users.model')

// Membuat fungsi getAllUsers yang dimanfaatkan sebagai callback pada pendefinisian end point dengan metode get pada Object userRouter
exports.getAllUsers = async (req,res) => {
  const users = await userModel.findAll()

  // res.json akan mengembalikan respon dari inputan user pada postman 
  return res.json({
    success: true,
    message: "List all users",
    results: users //results akan berisi Array of Object dari variabel users yang akan dikirimkan melalui body pada postman
  })
}


// Membuat fungsi getDetailUsers yang dimanfaatkan sebagai callback pada pendefinisian end point dengan metode get pada Object userRouter
exports.getDetailUser = async (req,res) => {
  const id = Number(req.params.id)
  const user = await userModel.findOne(id)
  // deklarasi variabel user dengan melakukan filter pada req.listUser yang berisi Array of Object berdasarkan nilai yang dipassing pada req.params.id melalui postman
  // req.params.id menyesuaikan end point /:id 
  // req.params.id akan berisi nilai yang dipassing melalui value pada key pada Path Variable pada url string pada GET method di postman

  // Pengkondisian jika terdapat value pada indeks 0 dari variabel user, maka akan mengembalikan nilai pada indeks 0 tersebut yang resultnya berupa Object
  if(user){
    return res.json({
      success: true,
      message: 'Detail user',
      results: user // user[0] akan mengembalikan nilai berupa Object pada indeks ke 0 dari Array of Object
    })
  }else{
    // Jika user[0] berisi data undefined maka tidak ada Object yang akan dikembalikan melalui body pada postman
    return res.json({
      success: false,
      message: 'User not found'
    })
  }
}


// Membuat fungsi createUser yang dimanfaatkan sebagai callback pada pendefinisian end point dengan metode post pada Object userRouter
exports.createUser = async(req, res) => {
  try{
    const user = await userModel.insert(req.body)

  // Mengembalikan respon dengan message 'Create user successfully' dan results yang berisi data Object user
  return res.json({
    success: true,
    message: 'Create user successfully',
    results: user
  })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: 'Error'
    })
  }
}

// Membuat fungsi updateUser yang dimanfaatkan sebagai callback pada pendefinisian end point dengan metode patch pada Object userRouter
exports.updateUser = (req, res) => {
  // Deklarasi variabel id dengan destructuring Object req.params
  const {id} = req.params

  // Deklarasi variabel name dengan destructuring Object req.body
  const {name} = req.body

  // Deklarasi variabel userId yang berisi nilai number id yang dikonversi dari string id yang didapatkan dari maping Array of Object users yang dikembalikan menjadi Array dan kemudian mencari indeks nilai dari Array tersebut berdasarkan id
  const userId = users.map(user => user.id).indexOf(Number(id))

  // Pengondisian jika nilai userId tidak sama dengan -1 maka
  if(userId !== -1){
    // key name pada Object dengan indeks ke-userId pada Array users akan di-reassign dengan nilai dari variabel name yang diperoleh dari destructuring pada req.body
    users[userId].name = name

    // dan mengembalikan respon dengan message 'Update user successfully' dan results berisi object users dengan indeks ke-userId
    return res.json({
      success: true,
      message: 'Update user successfully',
      resutls: users[userId]
    })
  }else{ //selain itu akan mengembalikan respon dengan status 404 dan message 'User not found'
    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  }
}

// Membuat fungsi deleteUser yang dimanfaatkan sebagai callback pada pendefinisian end point dengan metode delete pada Object userRouter
exports.deleteUser = (req, res) => {
  // Deklarasi variabel id dari proses destructuring pada req.params yang diperoleh dari input user
  const {id} = req.params;

  // Deklarasi variabel user yang diperoleh dari Array of Object users yang difilter berdasarkan id tiap object yang sesuai dengan integer id dari proses destructuring req.params sebelumnya
  const user = users.filter(user => user.id === Number(id))

  // Pengondisian jika panjang Array user tidak sama dengan nol, maka 
  if(user.length){
    // Array of Object users akan di reasign dengan Array of Object dengan filtrasi berdasarkan id tiap object yang tidak sama dengan integer id dari proses destructuring req.params sebelumnya
    users = users.filter(user => user.id !== Number(id))

    // dan mengembalikan respon dengan message 'Delete success' dan results berisi Array user pada indeks ke-0
    return res.json({
      success: true,
      message: 'Delete success',
      results: user[0]
    })
  }else{ // selain itu akan mengembalikan respon dengan status 404 dan message 'User not found'
    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  }
}