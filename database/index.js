const mongoose = require('mongoose');
const ec2Address = '54.176.50.56';
// mongoose.connect('mongodb://localhost/QA-API')
mongoose.connect(`mongodb://appuser:qaapiuser@${ec2Address}:27017/questions_api?authSource=admin`)
.then(() => console.log('Connected'))
.catch((err) => console.log('Could not connect: ', err));

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

module.exports.questionModels = {
  getQuestions: (productId, reqTime) => {
    console.time(`query find ${reqTime}`);
    return Question.find({ product_id: productId, reported: false }).select({ id: 1, body: 1, date_written: 1, asker_name: 1 }).lean()
      .then(results => {
        console.timeEnd(`query find ${reqTime}`);
        return results;
      })
      .catch(err => {
        console.log('failed to retrieve questions: ', err);
        return err;
      });
  },

  postQuestion: (questionData) => {
    return Question.findOne().sort({ id: -1 })
      .then(results => {
        questionData["id"] = results.id + 1;
        let newQuestion = new Question(questionData);
        return newQuestion.save()
          .then(results => results)
          .catch(err => {
            console.log('failed to save question: ', err);
            return err;
          });
      })
      .catch(err => {
        console.log('failed to get latest document: ', err);
        return err;
      })
  },

  putHelpful: (questionId) => {
    return Question.findOneAndUpdate({ id: questionId }, { $inc: { helpful: 1 } })
      .then(results => results)
      .catch(err => {
        console.log('failed to update helpful: ', err);
        return err;
      });
  },

  putReported: (questionId) => {
    return Question.findOneAndUpdate({ id: questionId }, { reported: true })
      .then(results => results)
      .catch(err => {
        console.log('failed to report the question: ', err);
        return err;
      });
  }
};
