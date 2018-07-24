const { Song, Comment } = require('../models/Song')
const users = require('./users')

const songs = []

// create the comment first so it can be embedded in the song

const comment = new Comment({
  body: 'Could we learn more words in the food category',
  user: users[1]
})

const song = new Song({
  title: 'HelloSong',
  composer: 'Anonymous',
  link: 'https://www.google.com',
  vocabString: 'baa baa black sheep',
  comments: []
})

const song2 = new Song({
  title: 'BElloSong',
  composer: 'Anonyaslidjhfus',
  link: 'https://www.google.com',
  vocabString: 'twinkle twinjke little star',
  comments: []
})

song.comments.push(comment)

songs.push(song, song2)

module.exports = songs
