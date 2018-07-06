const { Song, Comment } = require('../models/Song')
const users = require('./users')

const songs = []

// create the comment first so it can be embedded in the song

const comment = new Comment({
  body: 'Could we learn more words in the food category',
  user: users[1]
})

const song = new Song({
  title: 'Hello Song',
  composer: 'Anonymous',
  link: 'https://www.google.com',
  user: users[0],
  comments: []
})

song.comments.push(comment)

songs.push(song)

module.exports = songs
