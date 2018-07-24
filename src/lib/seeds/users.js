const User = require('../models/User')

const users = []

const samar = new User({
  firstName: 'Samar',
  lastName: 'Kokash',
  email: 'samar@gmail.com',
  password: '1234',
  role: 'Member'
})

users.push(samar)

const esme = new User({
  firstName: 'Esme',
  lastName: 'Allen-Creighton',
  email: 'eallencreighton@gmail.com',
  password: '1234',
  role: 'Administrator'
})

users.push(esme)

module.exports = users
