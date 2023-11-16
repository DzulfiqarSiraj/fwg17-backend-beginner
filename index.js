// Import module express
const express = require('express');

// assign fungsi express() ke dalam variabel app
const app = express();

// Membuat middleware digunakan untuk membuat aplikasi express memahami data yang dikirim oleh user melalui body
app.use(express.urlencoded({extended: false}))

// Membuat rute end poin dari index.js pada modul routers
app.use('/', require('./src/routers'))

// Menggunakan metode get pada end poin '/' untuk mengembalikan respon berupa json dengan message 'Backend is running pretty good...'
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running pretty good...'
  })
});

// Mengaitkan koneksi antara aplikasi backend kita dengan postman melalui port 8888
app.listen(8888,() => {
  console.log('App listening on port 8888...')
});