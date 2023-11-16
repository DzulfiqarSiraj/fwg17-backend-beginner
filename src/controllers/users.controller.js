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

// Membuat fungsi getAllUsers yang dimanfaatkan sebagai callback pada pendefinisian end point dengan metode get pada Object userRouter
exports.getAllUsers = (req,res) => {
  // res.json akan mengembalikan respon dari inputan user pada postman 
  return res.json({
    success: true,
    message: "List all users",
    results: users //results akan berisi Array of Object dari variabel users yang akan dikirimkan melalui body pada postman
  })
}


// Membuat fungsi getDetailUsers yang dimanfaatkan sebagai callback pada pendefinisian end point dengan metode get pada Object userRouter
exports.getDetailUser = (req,res) => {
  // deklarasi variabel user dengan melakukan filter pada req.listUser yang berisi Array of Object berdasarkan nilai yang dipassing pada req.params.id melalui postman 
  const user = users.filter(item => item.id === Number(req.params.id))
  // req.params.id menyesuaikan end point /:id 
  // req.params.id akan berisi nilai yang dipassing melalui value pada key pada Path Variable pada url string pada GET method di postman

  // Pengkondisian jika terdapat value pada indeks 0 dari variabel user, maka akan mengembalikan nilai pada indeks 0 tersebut yang resultnya berupa Object
  if(user[0]){
    return res.json({
      success: true,
      message: 'Detail user',
      results: user[0] // user[0] akan mengembalikan nilai berupa Object pada indeks ke 0 dari Array of Object
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
exports.createUser = (req, res) => {
  // Deklarasi variabel name melalui destructuring dari data yang diperoleh melalui req.body
  const {name} = req.body;
  // Increment pada countUser agar saat user baru ditambahkan, maka id akan secara otomatis berisi angka selanjutnya dari id data user sebelumnya
  countUser = countUser + 1

  // Deklarasi variabel user berupa Object yang berisi id dengan nilai hasil dari countUser yang telah diincrement dan name yang diperoleh melalui variabel name hasil destructuring req.body
  const user = {
    id: countUser,
    name
  };

  // Melakukan penambahan data Object baru dari variabel user pada variabel users dengan metode push
  users.push(user);
  // Mengembalikan respon dengan message 'Create user successfully' dan results yang berisi data Object user
  return res.json({
    success: true,
    message: 'Create user successfully',
    results: user
  })
}

exports.editUser = (req, res) => {
  const {id,name,newName} = req.body;
  const users = [
    {
      id: 1,
      name: 'John Doe'
    },
    {
      id: 2,
      name: 'Jean Doe'
    }
  ]
  users.map(data => {
    if(data.id == id && data.name === name){
      return res.json({
        success: true,
        message: 'Successfully update data'
      })
    }else{
      return res.json({
        success: false,
        message: 'id or name is unavailable'
      })
    }
  })
}

exports.removeUser = (req, res) => {
  const {id,name} = req.body;
  const users = [
    {
      id: 1,
      name: 'John Doe'
    },
    {
      id: 2,
      name: 'Jean Doe'
    }
  ]
  users.map(data => {
    if(data.id == id && data.name === name){
      return res.json({
        success: true,
        message: 'Successfully remove data'
      })
    }else{
      return res.json({
        success: false,
        message: 'id or name is unavailable'
      })
    }
  })
}