const express = require('express')
const app = express()
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/lets'
const PORT = 8080

app.use('/users', require('./api/users'))
app.use('/songs', require('./api/songs'))

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.toString() })
})

app.listen(PORT, async () => {
  await mongoose.connect(uri)
  console.log(`listening on port ${PORT}`)
})
