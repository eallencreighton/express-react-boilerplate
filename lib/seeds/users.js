const User = require('../models/User')

const users = []

const esme = new User({
  firstName: 'Esme',
  lastName: 'Allen-Creighton',
  role: 'Administrator'
})

users.push(esme)

const samar = new User({
  firstName: 'Samar',
  lastName: 'Kokash',
  role: 'Member'
})

users.push(samar)

module.exports = users
