const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://khris:Ugly1234@localhost:5432/sdc')


const question = sequelize.define('question', {
  // Model attributes are defined here
  id: {type: DataTypes.INTEGER, primaryKey: true},
  product_id: DataTypes.INTEGER,
  body: DataTypes.TEXT,
  date_written: DataTypes.TEXT,
  asker_name: DataTypes.TEXT,
  asker_email: DataTypes.TEXT,
  reported: DataTypes.INTEGER,
  helpful: DataTypes.INTEGER,
}, {
  // Other model options go here
  timestamps: false
});

let getAllQuestions = (product_id) => {
  return question.findAll({ where: { product_id: product_id } }).then(response => response)
}

module.exports.getAllQuestions = getAllQuestions;