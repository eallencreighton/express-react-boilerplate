const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  title: {
    type: 'String',
    required: true
  },
  body: {
    type: 'String',
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const songSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  composer: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  vocabString: {
    type: String
  },
  comments: [commentSchema]
})

module.exports = {
  Song: mongoose.model('Song', songSchema),
  Comment: mongoose.model('Comment', commentSchema)
}
