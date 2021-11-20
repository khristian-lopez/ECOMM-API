const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
/* const getOne = require('../database/index.js').getOne */
const { questionModels, answerFunctions } = require('../database/index.js')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*  app.get('/', (req, res) => {
  getOne().then(response => res.send(response))
}) */

app.get('/qa/questions/', (req, res) => {
  let productId = req.query.product_id;

  questionModels.getQuestions(productId)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(400).send(err));
})

app.post('/qa/questions/:product_id', (req, res) => {
  let productId = req.params.product_id;
  let data = req.body;
  let createdAt = new Date().getTime();

  questionModels.postQuestion({
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

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let questionId = req.params.question_id;

  questionModels.putHelpful(questionId)
    .then(results => res.status(202).send())
    .catch(err => res.status(400).send(err));
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  let questionId = req.params.question_id;

  questionModels.putReported(questionId)
    .then(results => res.status(202).send())
    .catch(err => res.status(400).send(err));
})

app.get('/qa/answers/', (req, res) => {
  answerFunctions.getAllAnswers(1)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(400).send(err));
})

app.post('/qa/answers/', (req, res) => {
})

app.put('/qa/answers/helpful', (req, res) => {
})

app.put('/qa/answers/report', (req, res) => {
})

app.listen(port, () => {
  console.log(`QA-API server listening at http://localhost:${port}`)
})