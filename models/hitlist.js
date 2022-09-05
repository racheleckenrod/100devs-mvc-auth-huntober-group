const mongoose = require('mongoose')

const HitList = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    current: {
    type: Number,
    default: 60,
    required: true,
  },

})

module.exports = mongoose.model('HitList', HitList)
