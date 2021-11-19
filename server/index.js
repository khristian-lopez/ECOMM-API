const express = require('express')
const app = express()
const port = 3000
const getAllQuestions = require('../database/index.js').getAllQuestions

app.get('/', (req, res) => {
  getAllQuestions(1).then(response => res.send(response))

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})