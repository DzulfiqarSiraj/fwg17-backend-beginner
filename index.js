require('dotenv').config({
  path: './.env'
})

global.path = __dirname


const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors())
app.use('/', require('./src/routers'))
app.use('/uploads/products',express.static('uploads/products'))
app.use('/uploads/users',express.static('uploads/users'))


app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running well...'
  })
});


app.listen(process.env.PORT,() => {
  console.log(`App listening on port ${process.env.PORT}...`)
});