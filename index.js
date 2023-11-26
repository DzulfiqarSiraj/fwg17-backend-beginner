require('dotenv').config({
  path: './.env'
})


const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'));
app.use(cors())
app.use('/', require('./src/routers'))


app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running well...'
  })
});


app.listen(process.env.PORT,() => {
  console.log(`App listening on port ${process.env.PORT}...`)
});