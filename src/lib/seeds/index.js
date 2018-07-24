const User = require('../models/User')
const { Song } = require('../models/Song')
const users = require('./users')
const songs = require('./songs')
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/lets'

// truncate the top (cut off the head) to get rid of old things in db

const truncateDatabase = async () => {
  return Promise.all([User.deleteMany(), Song.deleteMany()])
}

const makeSeeds = async () => {
  // connect to our mongo db
  await mongoose.connect(uri)
  // delete all old data in the database
  await truncateDatabase()
  // save all our users into the database
  await Promise.all(users.map(user => user.save()))
  // save our seeded song into the database
  await Promise.all(songs.map(song => song.save()))
  // when you are done, you have to close the connection
  mongoose.connection.close()
}

makeSeeds()
