// konfigurasi untuk koneksi database dengan program backend
require('dotenv').config({
  path: './.env'
})

// Import module express
const express = require('express');

// Import middleware CORS
const cors = require('cors');

// Import middleware morgan
const morgan = require('morgan')

// assign fungsi express() ke dalam variabel app
const app = express();

// Membuat middleware digunakan untuk membuat aplikasi express memahami data yang dikirim oleh user melalui body
app.use(express.urlencoded({extended: false}))

// Menggunakan morgan
app.use(morgan('dev'));

// Menggunakan cors
app.use(cors())

// 

// Membuat rute end poin dari index.js pada modul routers
app.use('/', require('./src/routers'))

// Menggunakan metode get pada end poin '/' untuk mengembalikan respon berupa json dengan message 'Backend is running pretty good...'
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running well...'
  })
});

// Mengaitkan koneksi antara aplikasi backend kita dengan postman melalui port 8888
app.listen(process.env.PORT,() => {
  console.log(`App listening on port ${process.env.PORT}...`)
});