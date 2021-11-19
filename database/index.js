const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QA-API')
.then(() => console.log('Connected'))
.catch(() => console.log('Could not connect'));

let questionSchema = mongoose.Schema({
  id: String,
  product_id: String,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: String,
  helpful: String
});

let Question = mongoose.model('Question', questionSchema, 'Questions')

let getOne = () => {
  return Question.findOne({id: '1'}).then(response => response)
}

module.exports.getOne = getOne;