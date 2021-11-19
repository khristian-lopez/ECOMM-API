const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const getOne = require('../database/index.js').getOne
const { questionModels } = require('../database/index.js')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   getOne().then(response => res.send(response))
// })

app.get('/questions/:product_id', (req, res) => {
  let productId = req.params.product_id;

  return questionModels.getQuestions(productId)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(400).send(err));
})

app.post('/questions/:product_id', (req, res) => {
  // TODO: figure out how to implement auto increment of id
  let productId = req.params.product_id;
  let data = req.body;
  let createdAt = new Date().getTime();

  return questionModels.postQuestion({
    id: 3518964,
    product_id: productId,
    body: data.body,
    date_written: createdAt,
    asker_name: data.name,
    asker_email: data.email,
    reported: false,
    helpful: 0
  })
    .then(results => {
      res.status(201).send(results)
    })
    .catch(err => res.status(400).send(err));
})

app.put('/questions/:question_id/helpful', (req, res) => {

})

app.put('/questions/:question_id/report', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})