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

const song3 = new Song({
  title: "You've Got a Friend",
  composer: "Carole King",
  link: "https://docs.google.com/document/d/1AAhP_rND5iU2syDtdjXNEnqjHofHvD8MHe7aT-wXDSo/edit?usp=sharing",
  vocabString: "You've Got a Friend\r\nCarole King\r\nWhen you're down and troubled\r\nAnd you need some love and care\r\nAnd nothing, nothing is going right\r\nClose your eyes and think of me\r\nAnd soon I will be there\r\nTo brighten up even your darkest night\r\nYou just call out my name\r\nAnd you know wherever I am\r\nI'll come running, to see you again\r\nWinter, spring, summer or fall\r\nAll you have to do is call\r\nAnd I'll be there\r\nYou've got a friend\r\nIf the sky above you\r\nGrows dark and full of clouds\r\nAnd that old north wind begins to blow\r\nKeep your head together\r\nAnd call my name out loud\r\nSoon you'll hear me knocking at your door\r\nYou just call out my name\r\nAnd you know wherever I am\r\nI'll come running, running, yeah, yeah, to see you again\r\nWinter, spring, summer or fall\r\nAll you have to do is call\r\nAnd I'll be there, yes, I will",
  comments: []
})

const song4 = new Song({
  title: "Listen to the Water",
  composer: "Anonymous",
  link: "https://docs.google.com/document/d/1K21JQykjlgXZw0xHvLJNM42NIyJMk0NiFExCL4ADSK8/edit?usp=sharing",
  vocabString: "LISTEN TO THE WATER\r\n\r\n\r\nListen to the water Listen to the water, rolling down the river. \r\n\r\n\r\n1.I see some birds by the water side. \r\n2.I see some fish by the water side. \r\n3.I see some ducks by the water side. \r\n4.I see some flowers by the water side. \r\n\r\n\r\nWe the children \r\n1.In every heart there is an ocean, In every voice there is a song. Every mind contains a crystal pool that we can go to for the truth, And if we listen to the silence, we can hear it loud and strong. Something we’ve known all along. \r\n\r\n\r\nChorus: For we the children are golden, and we the children are light. We dance on the top of the mountain. We shine like stars in the night. And we know that our hopes and dreams will grow. When we the children make it so. \r\n\r\n\r\n2. In every storm there is a rainbow. In every house there is a home. Every act of love and kindness has a way of being passed along. For we are all the deep reflections of the lessons we’ve been shown. Hand in hand we’re not alone. \r\nChorus. \r\n\r\n\r\n3. If we’re ever going to make this world a better place to live. If we’re ever going to wash away the sorrow. Then we better start believing that love is all we need. Love will plant the seed for tomorrow. \r\n\r\n\r\nChorus 3 times.",
  comments: []
})


song.comments.push(comment, comment2)

songs.push(song, song2, song3, song4)

module.exports = songs
