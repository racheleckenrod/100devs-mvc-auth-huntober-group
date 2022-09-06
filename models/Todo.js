const mongoose = require('mongoose')

const DefaultSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date, //Number? or string for this? hmmm String that gets turned into date object probably
    //mongoose docs say that you can do { dueDate: Date }
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
module.exports = mongoose.model('defaultTodo', DefaultSchema)