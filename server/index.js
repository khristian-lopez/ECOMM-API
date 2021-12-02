const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const getOne = require('../database/index.js').getOne
const { questionModels } = require('../database/index.js')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/loaderio-1e727d46e36ea8c4778bb78690659689.txt', (req, res) => {
  res.status(200).send('loaderio-1e727d46e36ea8c4778bb78690659689');
})

app.get('/qa/questions/', (req, res) => {
  let productId = req.query.product_id;
  let reqTime = req._startTime.getTime();
  console.time(`handler ${reqTime}`);
  questionModels.getQuestions(productId, reqTime)
    .then(results => {
      res.status(200).send(results);
      console.timeEnd(`handler ${reqTime}`);
    })
    .catch(err => res.status(400).send(err));
})

app.post('/qa/questions/:product_id', (req, res) => {
  let productId = req.params.product_id;
  let data = req.body;
  let createdAt = new Date().getTime();

  let questionData = {
    product_id: productId,
    body: data.body,
    date_written: createdAt,
    asker_name: data.name,
    asker_email: data.email,
    reported: false,
    helpful: 0
  };

  questionModels.postQuestion(questionData)
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})