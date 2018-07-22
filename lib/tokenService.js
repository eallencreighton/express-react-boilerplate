const jwt = require('jsonwebtoken')

const config = require('config')
// a service to create a new token
// a service to create a new token
// it accepts a user and sends back a signed token
const create = user => {
  // grab the id off of the user
  const { _id } = user

  // describe what we want the token to look like
  const payload = {
    user: {
      id: _id
    }
  }
  // sign it (using the secret), and send it back
  return jwt.sign(payload, config.SECRET)
}

const verify = token => jwt.verify(token, config.SECRET)

module.exports = {
  create,
  verify
}
