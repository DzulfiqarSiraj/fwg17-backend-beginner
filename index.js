const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}))


app.use('/', require('./src/routers'))

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running pretty good... '
  })
});



app.listen(8888,() => {
  console.log('App listening on port 8888...')
})