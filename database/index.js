const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QA-API')
.then(() => console.log('Connected'))
.catch(() => console.log('Could not connect'));

let questionSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  body: String,
  date_written: Number,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number
});

let Question = mongoose.model('Question', questionSchema, 'questions')

let getOne = () => {
  return Question.findOne({id: '1'}).then(response => response)
}

module.exports.questionModels = {
  getQuestions: (productId) => {
    return Question.find({ product_id: productId })
      .then(results => results)
      .catch(err => {
        console.log('failed to retrieve questions: ', err);
        return err;
      });
  },

  postQuestion: (questionData) => {
    // TODO: figure out how to implement auto increment of id
    let newQuestion = new Question(questionData);

    return newQuestion.save()
      .then(results => results)
      .catch(err => {
        console.log('failed to save question: ', err);
        return err;
      });
  },

  put: () => {

  },

  putReported: () => {

  }
};

module.exports.getOne = getOne;