const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const uri = 'mongodb://localhost:27017/lets'
const config = require('config')

const path = require('path')
const PORT = process.env.PORT || config.PORT
const MONGODB_URI = process.env.MONGODB_URI || config.MONGODB_URI

app.use(bodyParser.json())
app.use('/auth', require('./api/auth'))
app.use('/users', require('./api/users'))
app.use('/songs', require('./api/songs'))
app.use('/title', require('./api/title'))
app.use('/content', require('./api/content'))
app.use('/signup', require('./api/signup'))
app.use('/login', require('./api/login'))

app.use('/', express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.toString() })
})

app.listen(PORT, async () => {
  await mongoose.connect(MONGODB_URI)
  console.log(`listening on port ${PORT}`)
})
