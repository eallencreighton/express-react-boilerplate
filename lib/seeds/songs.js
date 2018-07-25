const { Song, Comment } = require('../models/Song')
const users = require('./users')

const songs = []

// create the comment first so it can be embedded in the song

const comment = new Comment({
  title: 'More food',
  body: 'Could we learn more words in the food category',
  user: users[0]
})

const comment2 = new Comment({
  title: 'What I love',
  body: 'Learnign is so much fun!!',
  user: users[1]
})

const song = new Song({
  title: 'HelloSong',
  composer: 'Anonymous',
  link: 'https://docs.google.com/document/d/1a75eX2hNOdtCBRCT9PszyaZeK0P5j-BCFOdlH5YOwTo/edit?usp=sharing',
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

song.comments.push(comment, comment2)

songs.push(song, song2)

module.exports = songs
