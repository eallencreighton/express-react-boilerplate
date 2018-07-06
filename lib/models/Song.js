const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [commentSchema]
})

module.exports = {
  Song: mongoose.model('Song', songSchema),
  Comment: mongoose.model('Comment', commentSchema)
}
