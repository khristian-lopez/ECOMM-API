const express = require('express')
const app = express()
const port = 3000
const getOne = require('../database/index.js').getOne

app.get('/', (req, res) => {
  getOne().then(response => res.send(response))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})